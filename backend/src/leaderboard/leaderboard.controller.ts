import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common"
import { LeaderboardService } from "./leaderboard.service"
import { JwtAuthGuard } from "src/common/guard"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

@UseGuards(JwtAuthGuard)
@Controller("leaderboard")
@ApiTags("leaderboard")
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Get("tokens")
    async getLeaderboardToken() {
        return this.leaderboardService.getLeaderboardToken()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Get("experience")
    async getLeaderboardExperience() {
        return this.leaderboardService.getLeaderboardExperience()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Get("messages")
    async getLeaderboardMessages() {
        return this.leaderboardService.getLeaderboardMessages()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Get("packs")
    async getLeaderboardPacks() {
        return this.leaderboardService.getLeaderboardPacks()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse()
    @Get("blooks")
    async getLeaderboardBlooks() {
        return this.leaderboardService.getLeaderboardBlooks()
    }
}
