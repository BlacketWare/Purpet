import { IsNotEmpty, Validate } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotInteger } from "src/common/validate"

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @Validate(IsNotInteger)
    readonly username: string

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string
}

export default AuthDto