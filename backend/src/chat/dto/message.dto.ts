import { IsNotEmpty, IsString } from "class-validator"

export class MessageDto {
    @IsString()
    @IsNotEmpty()
        message: string
}