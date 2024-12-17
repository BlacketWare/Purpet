import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "../types"
import { WsException } from "@nestjs/websockets"
import { UserService } from "src/user/user.service"
import { User } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, "wsjwt") {
    constructor(
        private readonly userService: UserService,
        config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                WsJwtStrategy.cookieExtractor,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: config.get<string>("AT_SECRET"),
        })
    }

    private static cookieExtractor(req: Request) {
        if (
            req &&
            req.cookies &&
			"access_token" in req.cookies &&
			req.cookies.access_token.length > 0
        ) {
            return req.cookies.access_token
        }

        return null
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userService.getUser(payload.sub)

        if (!user) {
            throw new WsException("Unauthorized")
        }

        return user
    }
}