import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly oldPassword: string

    @ApiProperty()
    @IsNotEmpty()
    readonly newPassword: string
}

export default ResetPasswordDto