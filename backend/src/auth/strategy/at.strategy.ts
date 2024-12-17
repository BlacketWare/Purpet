import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Request } from "express"
import { UserService } from "src/user/user.service"
import { JwtPayload } from "../types"
import { RedisService } from "src/redis/redis.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        config: ConfigService,
        private userService: UserService,
        private readonly redisService: RedisService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.cookieExtractor,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get("AT_SECRET"),
        })
    }

    private static cookieExtractor(req: Request) {
        if (
            req.cookies &&
			"access_token" in req.cookies &&
			req.cookies.access_token.length > 0
        ) {
            return req.cookies.access_token
        }

        return null
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.getUser(payload.sub)

        if (!user) {
            throw new UnauthorizedException()
        }

        if (await this.redisService.get(`invalidated_at_${payload.jti}`)) {
            throw new UnauthorizedException()
        }

        return user
    }
}