import { Module } from "@nestjs/common"
import { ChatController } from "./chat.controller"
import { ChatService } from "./chat.service"
import { ChatGateway } from "./chat.gateway"
import { AuthModule } from "src/auth/auth.module"
import { UserModule } from "src/user/user.module"

@Module({
    imports: [
        AuthModule, UserModule,
    ],
    controllers: [ChatController],
    providers: [
        ChatService, ChatGateway,
    ],
})
export class ChatModule {}
