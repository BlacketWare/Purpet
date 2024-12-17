import { IsInt, IsNotEmpty } from "class-validator"

export class RoomDto {
    @IsInt()
    @IsNotEmpty()
        roomId: string
}