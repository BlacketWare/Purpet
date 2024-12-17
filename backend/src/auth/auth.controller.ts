import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Res, Request, Patch } from "@nestjs/common"
import { Response } from "express"
import { AuthService } from "./auth.service"
import { AuthDto, ResetPasswordDto, UserPasswordDto } from "./dto"
import { RtGuard, JwtAuthGuard } from "../common/guard"
import { GetCurrentUser } from "../common/decorator"
import { JwtPayloadWithRt } from "./types"
import { User } from "@prisma/client"
import { ApiTags } from "@nestjs/swagger"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor (private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(dto, res)
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(dto, res)
    }

    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    @Post("refresh")
    refresh(@GetCurrentUser() jwtPayload: JwtPayloadWithRt, @Res({ passthrough: true }) res: Response) {
        return this.authService.refreshTokens(jwtPayload, res)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("logout")
    logout(@Request() req: any) {
        return this.authService.logout(req)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("deleteaccount")
    deleteAccount(@GetCurrentUser() user: User, @Body() dto: UserPasswordDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.deleteAccount(user, dto, res)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch("changeusername")
    changeusername(@GetCurrentUser() user: User, @Body() dto: AuthDto) {
        return this.authService.changeUsername(user, dto)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Patch("changepassword")
    changePassword(@GetCurrentUser() user: User, @Body() dto: ResetPasswordDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.changePassword(user, dto, res)
    }
}