import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class LeaderboardService {
    constructor(private prisma: PrismaService) {}
    async getLeaderboardToken() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                tokens: true,
                avatar: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                tokens: "desc",
            },
            take: 10,
        })
    }

    async getLeaderboardExperience() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                avatar: {
                    select: {
                        id: true,
                    },
                },
                stats: {
                    select: {
                        experience: true,
                    },
                },
            },
            orderBy: {
                stats: {
                    experience: "desc",
                },
            },
            take: 10,
        })
    }

    async getLeaderboardMessages() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                avatar: {
                    select: {
                        id: true,
                    },
                },
                stats: {
                    select: {
                        messages: true,
                    },
                },
            },
            orderBy: {
                stats: {
                    messages: "desc",
                },
            },
            take: 10,
        })
    }

    async getLeaderboardPacks() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                avatar: {
                    select: {
                        id: true,
                    },
                },
                stats: {
                    select: {
                        packs: true,
                    },
                },
            },
            orderBy: {
                stats: {
                    packs: "desc",
                },
            },
            take: 10,
        })
    }

    async getLeaderboardBlooks() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                avatar: {
                    select: {
                        id: true,
                    },
                },
                _count: {
                    select: {
                        blooks: true,
                    },
                },
            },
            orderBy: {
                blooks: {
                    _count: "desc",
                },
            },
            take: 10,
        })
    }
}
