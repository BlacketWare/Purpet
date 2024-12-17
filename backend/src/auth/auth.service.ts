import { ForbiddenException, Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthDto, ResetPasswordDto, UserPasswordDto } from "./dto"
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { Banner, Blook, Group, User } from "@prisma/client"
import { JwtPayload, JwtPayloadWithRt, Tokens } from "./types"
import { Response } from "express"
import { RedisService } from "src/redis/redis.service"
import { randomUUID } from "crypto"

@Injectable()
export class AuthService implements OnModuleInit {
    private defaultAvatar: Blook
    private defaultBanner: Banner
    private defaultGroup: Group

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService, private redis: RedisService) {}

    async onModuleInit() {
        this.defaultAvatar = await this.prisma.blook.findFirst({
            where: {
                name: "Default",
            },
        })

        this.defaultBanner = await this.prisma.banner.findFirst({
            where: {
                name: "Default",
            },
        })

        this.defaultGroup = await this.prisma.group.findFirst({
            where: {
                name: "User",
            },
        })
    }

    async register(dto: AuthDto, res: Response): Promise<void> {
        // generate password hash
        const hash = await argon.hash(dto.password)

        // save new user to db
        try {
            const usernameExists = await this.prisma.user.count({
                where: {
                    username: {
                        equals: dto.username,
                        mode: "insensitive",
                    },
                },
            })

            if (usernameExists > 0) throw new ForbiddenException("Username is already taken")

            const userStats = await this.prisma.userStats.create({ })

            try {
                const user = await this.prisma.user.create({
                    data: {
                        username: dto.username,
                        password: hash,
                        avatarId: this.defaultAvatar.id,
                        bannerId: this.defaultBanner.id,
                        groupId: this.defaultGroup.id,
                        statsId: userStats.id,
                    },
                })

                // return access and refresh tokens
                const tokens = await this.getTokens(user)

                await this.assignTokensToResponse(tokens, res)
            } catch (error) {
                await this.prisma.userStats.delete({
                    where: {
                        id: userStats.id,
                    },
                })
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Username is already taken")
                }
            }
            throw error
        }
    }

    async login(dto: AuthDto, res: Response): Promise<void> {
        // find the user by username
        const prismaUser = await this.prisma.user.findUnique({
            where: {
                username: dto.username,
            },
        })
        // if user does not exist throw exception
        if (!prismaUser) throw new ForbiddenException("Username or password incorrect")

        // compare password
        const passwordMatches = await argon.verify(prismaUser.password, dto.password)
        // if password incorrect throw exception
        if (!passwordMatches) throw new ForbiddenException("Username or password incorrect")

        // return access and refresh tokens
        const tokens = await this.getTokens(prismaUser)

        await this.assignTokensToResponse(tokens, res)
    }

    async logout(req: any): Promise<void> {
        const at = this.jwt.decode(req.cookies.access_token)
        await this.prisma.jwtTokens.delete({
            where: {
                id: at["jti"],
            },
        })
        this.redis.set(`invalidated_at_${at["jti"]}`, "true", "EX", 60 * 15)
    }

    async refreshTokens(decodedAt: JwtPayloadWithRt, res: Response): Promise<void> {
        const decodedRt = this.jwt.decode(decodedAt.rt)

        if (decodedRt["sub"] !== decodedAt.sub) throw new ForbiddenException("Invalid refresh token")

        const user = await this.prisma.user.findUnique({
            where: {
                id: decodedAt.sub,
            },
        })

        await this.prisma.jwtTokens.delete({
            where: {
                id: decodedRt["jti"],
            },
        }).catch((err) => {
            console.log(decodedRt, decodedAt, user)
            console.error(err)
        }) // TODO: delete this since it shouldn't happen anymore (REMEMBER TO CHANGE JWT SECRET WHEN WE'RE DOING STUFF U DUMB FUCK)

        // return access and refresh tokens
        const tokens = await this.getTokens(user)

        await this.assignTokensToResponse(tokens, res)
    }

    async getTokens(user: User): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: user.id,
            username: user.username,
            jti: randomUUID(),
        }

        const [
            access_token, refresh_token,
        ] = await Promise.all([
            this.jwt.signAsync(jwtPayload, {
                expiresIn: "15m",
                secret: this.config.get("AT_SECRET"),
            }),
            this.jwt.signAsync(jwtPayload, {
                expiresIn: "7d",
                secret: this.config.get("RT_SECRET"),
            }),
        ])

        await this.prisma.jwtTokens.create({
            data: {
                id: jwtPayload.jti,
                userId: user.id,
                refreshToken: refresh_token,
            },
        })

        return {
            access_token,
            refresh_token,
        }
    }

    async assignTokensToResponse(tokens: Tokens, res: Response): Promise<void> {
        res.cookie("refresh_token", tokens.refresh_token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
            sameSite: "strict",
            httpOnly: true,
        })
        res.cookie("access_token", tokens.access_token, {
            expires: new Date(Date.now() + 15 * 60 * 1000), // 15m
            sameSite: "strict",
            httpOnly: true,
        })
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get("AT_SECRET"),
        })
    }

    // TODO: move to user service
    async deleteAccount(user: User, dto: UserPasswordDto, res: Response): Promise<void> {
        const passwordMatches = await argon.verify(user.password, dto.password)
        // if password incorrect throw exception
        if (!passwordMatches) throw new ForbiddenException("Username or password incorrect")

        await this.prisma.userBlooks.deleteMany({
            where: {
                userId: user.id,
            },
        })

        await this.prisma.jwtTokens.deleteMany({
            where: {
                userId: user.id,
            },
        })

        await this.prisma.user.deleteMany({
            where: {
                id: user.id,
            },
        })

        await this.prisma.userStats.delete({
            where: {
                id: user.statsId,
            },
        })

        res.clearCookie("refresh_token")
        res.clearCookie("access_token")
    }

    async changeUsername(user: User, dto: AuthDto): Promise<void> {
        const passwordMatches = await argon.verify(user.password, dto.password)
        // if password incorrect throw exception
        if (!passwordMatches) throw new ForbiddenException("Username or password incorrect")

        const usernameExists = await this.prisma.user.count({
            where: {
                username: {
                    equals: dto.username,
                    mode: "insensitive",
                },
            },
        })

        if (usernameExists > 0) throw new ForbiddenException("Username is already taken")

        await this.prisma.user.update({
            data: {
                username: dto.username,
            },
            where: {
                id: user.id,
            },
        })
    }

    async changePassword(user: User, dto: ResetPasswordDto, res: Response): Promise<void> {
        const passwordMatches = await argon.verify(user.password, dto.oldPassword)
        // if password incorrect throw exception
        if (!passwordMatches) throw new ForbiddenException("Username or password incorrect")

        const hash = await argon.hash(dto.newPassword)

        await this.prisma.user.update({
            data: {
                password: hash,
            },
            where: {
                id: user.id,
            },
        })

        const tokens = await this.prisma.jwtTokens.findMany({
            where: {
                userId: user.id,
            },
        })

        for (const token of tokens) {
            this.redis.set(`invalidated_at_${token.id}`, "true", "EX", 60 * 15)
        }

        await this.prisma.jwtTokens.deleteMany({
            where: {
                userId: user.id,
            },
        })

        res.clearCookie("refresh_token")
        res.clearCookie("access_token")
    }
}