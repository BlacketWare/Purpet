import { ForbiddenException, Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { OpenPackDto } from "./dto"

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    async claimDailyTokens(user: User) {
        // get current date at midnight
        const lastDailyTokenClaim = new Date()
        lastDailyTokenClaim.setHours(0, 0, 0, 0)

        // check if user has claimed rewards by comparing lastDailyTokenClaim
        if (user.lastDailyTokenClaim && user.lastDailyTokenClaim >= lastDailyTokenClaim) throw new ForbiddenException("You have already claimed your daily tokens")

        // calculate tokens gained
        const gained = Math.floor(Math.pow(Math.random(), 2.5) * 11) * 50 + 500

        await this.prisma.user.update({
            data: {
                lastDailyTokenClaim,
                tokens: {
                    increment: gained,
                },
            },
            where: {
                id: user.id,
            },
        })

        return gained
    }

    async openPack(user: User, dto: OpenPackDto) {
        const pack = await this.prisma.pack.findFirst({
            where: {
                id: dto.pack,
            },
        })

        if (!pack || pack.hidden) throw new ForbiddenException("Invalid pack")

        if (user.tokens < pack.price) throw new ForbiddenException("You don't have enough tokens")

        const blooks = await this.prisma.blook.findMany({
            where: {
                packId: pack.id,
            },
            include: {
                pack: true,
                asset: true,
                rarity: true,
            },
        })

        const blooksChance = blooks.map((blook) => blook.chance)
        // add function to blooksChance to create boosters
        const totalChance = blooksChance.reduce((acc, chance) => acc + chance, 0)
        let randomNumber = Math.random() * totalChance

        const blookIndex = blooksChance.findIndex((chance) => (randomNumber -= chance) < 0)
        const blook = blooks[blookIndex]

        await this.prisma.user.update({
            data: {
                tokens: {
                    decrement: pack.price,
                },
                blooks: {
                    create: {
                        blookId: blook.id,
                    },
                },
                stats: {
                    update: {
                        packs: {
                            increment: 1,
                        },
                        experience: {
                            increment: 10,
                        },
                    },
                },
            },
            where: {
                id: user.id,
            },
        })

        return blook
    }

    async getAllBlooks() {
        return this.prisma.blook.findMany({
            include: {
                asset: true,
            },
        })
    }

    async getAllPacks() {
        return this.prisma.pack.findMany({
            include: {
                blooks: {
                    select: {
                        id: true,
                    },
                },
                asset: true,
                background: true,
            },
        })
    }

    async getAllRarities() {
        return this.prisma.rarity.findMany()
    }

    async getAllBanners() {
        return this.prisma.banner.findMany({
            include: {
                asset: true,
            },
        })
    }

    async getAllColours() {
        return this.prisma.colour.findMany()
    }
}
