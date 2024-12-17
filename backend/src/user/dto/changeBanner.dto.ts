import { IsNotEmpty, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ChangeBannerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly banner: number
}

export default ChangeBannerDto