import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import { GameModule } from "./game/game.module"
import { ChatModule } from "./chat/chat.module"
import { RedisModule } from "./redis/redis.module"
import { PermissionModule } from "./permission/permission.module"
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { APP_GUARD } from "@nestjs/core"
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "../.env",
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 1000,
                limit: 8,
            },
        ]),
        UserModule,
        AuthModule,
        PrismaModule,
        GameModule,
        ChatModule,
        RedisModule,
        PermissionModule,
        LeaderboardModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
