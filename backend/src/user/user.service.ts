import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { ChangeBannerDto, ChangeBlookDto } from "./dto"
import { User } from "@prisma/client"

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserWithBlooks(id: number) {
        const user: any = await this.getUser(id)

        user.blooks = await this.getUserBlooks(id)

        return user
    }

    async getUser(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                stats: true,
                avatar: true,
                banner: true,
                group: true,
            },
        })
    }

    async getUserBlooks(id: number) {
        const userBlooks = await this.prisma.userBlooks.findMany({
            where: {
                userId: id,
            },
            select: {
                blookId: true,
            },
        })

        const blookQuantities = userBlooks.flatMap((blook) => blook.blookId).reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {})

        return blookQuantities
    }

    async getUserPublicWithBlooks(reference: string) {
        const user: any = await this.getUserPublic(reference)

        const start = Date.now()
        user.blooks = await this.getUserBlooks(user.id)
        console.log("Time taken for blooks query: ", Date.now() - start)

        return user
    }

    async getUserPublic(reference: string) {
        const start = Date.now()
        const users = await this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        id : +reference || 0,
                    },
                    {
                        username: reference,
                    },
                ],
            },
            include: {
                stats: true,
                avatar: true,
                banner: true,
                group: true,
            },
        }).catch((err) => {
            if (err.code === "P2025") {
                throw new NotFoundException("User not found")
            }
            throw err
        })

        console.log("Time taken for user query: ", Date.now() - start)

        if (users.length === 0) {
            throw new NotFoundException("User not found")
        }

        return users[0]
    }

    async changeAvatar(user: User, dto: ChangeBlookDto) {
        const blookCount = await this.prisma.userBlooks.count({
            where: {
                userId: user.id,
                blookId: dto.blook,
            },
        })

        if (blookCount <= 0) throw new ForbiddenException("Blook not owned")

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                avatarId: dto.blook,
            },
        })
    }

    async changeBanner(user: User, dto: ChangeBannerDto) {
        const banner = await this.prisma.banner.findUnique({
            where: {
                id: dto.banner,
            },
        })

        if (!banner) throw new NotFoundException("Banner not found")

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                bannerId: dto.banner,
            },
        })
    }
}
