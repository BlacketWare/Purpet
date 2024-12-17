import { Controller, Post, UseGuards, HttpCode, HttpStatus, Body, Get } from "@nestjs/common"
import { GameService } from "./game.service"
import { JwtAuthGuard } from "src/common/guard"
import { GetCurrentUser } from "src/common/decorator"
import { User } from "@prisma/client"
import { OpenPackDto } from "./dto"
import { ApiTags } from "@nestjs/swagger"

@UseGuards(JwtAuthGuard)
@Controller("game")
@ApiTags("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @HttpCode(HttpStatus.OK)
    @Post("claimdailytokens")
    claimDailyTokens(@GetCurrentUser() user: User) {
	  return this.gameService.claimDailyTokens(user)
    }

    @HttpCode(HttpStatus.OK)
    @Post("openPack")
    openPack(@GetCurrentUser() user: User, @Body() dto: OpenPackDto) {
        return this.gameService.openPack(user, dto)
    }

    @HttpCode(HttpStatus.OK)
    @Get("blooks")
    getAllBlooks() {
        return this.gameService.getAllBlooks()
    }

    @HttpCode(HttpStatus.OK)
    @Get("packs")
    getAllPacks() {
        return this.gameService.getAllPacks()
    }

    @HttpCode(HttpStatus.OK)
    @Get("rarities")
    getAllRarities() {
        return this.gameService.getAllRarities()
    }

    @HttpCode(HttpStatus.OK)
    @Get("banners")
    getAllBanners() {
        return this.gameService.getAllBanners()
    }

    @HttpCode(HttpStatus.OK)
    @Get("colours")
    getAllColours() {
        return this.gameService.getAllColours()
    }
}