import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "express"
import { ForbiddenException, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtPayload, JwtPayloadWithRt } from "../types"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RtStrategy.cookieExtractor,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: config.get<string>("RT_SECRET"),
            passReqToCallback: true,
        })
    }

    private static cookieExtractor(req: Request) {
        if (
            req.cookies &&
			"refresh_token" in req.cookies &&
			req.cookies.refresh_token.length > 0
        ) {
            return req.cookies.refresh_token
        }

        return null
    }

    async validate(req: Request, payload: JwtPayload): Promise<JwtPayloadWithRt> {
        const refreshToken = req?.cookies?.refresh_token

        if (!refreshToken) throw new ForbiddenException("Refresh token malformed")

        const rt = await this.prisma.jwtTokens.findFirst({ where: { id: payload.jti } })

        if (!rt) throw new ForbiddenException("Invalid refresh token")

        return {
            ...payload,
            rt: refreshToken,
        }
    }
}