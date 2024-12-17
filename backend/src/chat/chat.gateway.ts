import { MessageDto } from "./dto"
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { ChatService } from "./chat.service"
import { GetCurrentUser, Permissions } from "src/common/decorator"
import { User } from "@prisma/client"
import { WsAuthGuard, PermissionGuard, JwtAuthGuard } from "src/common/guard"
import { UseGuards } from "@nestjs/common"
import { Server as eiowsServer } from "eiows"
import Permission from "src/permission/enum/permission.enum"

@UseGuards(WsAuthGuard, PermissionGuard)
@WebSocketGateway({
    cors: {
	  origin: "*",
    },
    wsEngine: eiowsServer,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
        server: Server

    constructor(private chatService: ChatService) {}

    handleDisconnect(client: Socket): void {
        console.log(`Client disconnected: ${client.id}`)
    }

    async handleConnection(client: Socket, ...args: any[]): Promise<void> {
        console.log(`Client connected: ${client.id}`)

        await this.chatService.verifyConnection(this.server, client, client.handshake.headers.cookie?.split("access_token=")[1]?.split(";")[0])
    }

    @SubscribeMessage("disconnect")
    async disconnect(@MessageBody() message: MessageDto, @ConnectedSocket() socket: Socket, @GetCurrentUser() user: User) {
        const newmessage = await this.chatService.createMessage(message, user.id)

        this.server.sockets.emit("receive_message", newmessage)

        return newmessage
    }

    /**
	 * now:
	 * send_message
	 * receive_message
	 * get_all_messages
	 *
	 * later:
	 * delete_message
	 * edit_message
	 * react_message
	 *
	 *
	 * currently there is only one room, but later there will be multiple rooms and user rooms as well (need to implement all)
	 */

    @Permissions([Permission.SEND_MESSAGES])
    @SubscribeMessage("send_message")
    async listenForMessages(@MessageBody() message: MessageDto, @ConnectedSocket() socket: Socket, @GetCurrentUser() user: User) {
        const newmessage = await this.chatService.createMessage(message, user.id)

        this.server.sockets.emit("receive_message", newmessage)

        return newmessage
    }

    @SubscribeMessage("get_all_messages")
    async getAllMessages(@ConnectedSocket() socket: Socket) {
        console.log(this.server.sockets)
        const messages = await this.chatService.getAllMessages()

        socket.emit("receive_message", messages)

        return "test"
    }

    // TODO: implement delete message
    @SubscribeMessage("delete_message")
    async deleteMessage() {
        return
    }
}