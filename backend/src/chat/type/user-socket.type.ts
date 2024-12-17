import { User } from "@prisma/client"
import { Socket } from "socket.io"

export type UserSocket = {
    handshake: {
        user: User,
    },
} & Socket