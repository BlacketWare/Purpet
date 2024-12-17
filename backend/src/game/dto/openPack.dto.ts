import { IsNotEmpty, IsNumber, Validate } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class OpenPackDto {
    @ApiProperty()
    @IsNotEmpty()
    @Validate(IsNumber)
    readonly pack: number
}

export default OpenPackDto