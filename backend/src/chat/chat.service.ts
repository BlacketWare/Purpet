import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { Server, Socket } from "socket.io"
import { AuthService } from "src/auth/auth.service"
import { JwtPayload } from "src/auth/types"
import { PrismaService } from "src/prisma/prisma.service"
import { UserService } from "src/user/user.service"

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService, private authService: AuthService, private userService: UserService) {}

    async emitErrorAndDisconnect(socket: Socket, message: string): Promise<void> {
        socket.emit("error", message)
        socket.disconnect(true)
    }

    async verifyConnection(server: Server, client: Socket, token: string): Promise<void> {
        try {
            const payload: JwtPayload = await this.verifyToken(token)

            if (!payload || !payload.sub) return this.emitErrorAndDisconnect(client, "unauthorized")

            const user = await this.findUserById(payload.sub)

            if (!user) return this.emitErrorAndDisconnect(client, "unauthorized")

            // if (this.checkIfUserIsAlreadyConnected(server, user)) return this.emitErrorAndDisconnect(client, 'already_connected');

            client.handshake["user"] = user
            return
        } catch (error) {
            console.log(error)
            return this.emitErrorAndDisconnect(client, "unauthorized")
        }
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        console.log(token)
        return this.authService.verifyToken(token)
    }

    async findUserById(id: number): Promise<User> {
        return this.userService.getUser(id)
    }

    async checkIfUserIsAlreadyConnected(server: Server, user: User): Promise<boolean> {
        const sockets = await server.fetchSockets()
        const connectedUsers = sockets.filter((socket) => !!socket.handshake["user"]).map((socket) => socket.handshake["user"].id)

        console.log(connectedUsers.includes(user.id))

        return connectedUsers.includes(user.id)
    }

    async createMessage(message, id) {
        console.log(`${id}: ${message}`)
    }

    async getAllMessages() {
        return [{message: "hello", user: {username: "test"}}]
    }
}
