import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy, RtStrategy, WsJwtStrategy } from "./strategy"
import { UserModule } from "src/user/user.module"

@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService, JwtStrategy, RtStrategy, WsJwtStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
