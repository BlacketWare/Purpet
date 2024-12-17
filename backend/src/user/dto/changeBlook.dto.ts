import { IsNotEmpty, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ChangeBlookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly blook: number
}

export default ChangeBlookDto