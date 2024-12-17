import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string
}

export default UserPasswordDto