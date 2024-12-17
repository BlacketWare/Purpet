import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common"
import { User } from "@prisma/client"
import { GetCurrentUser, Permissions } from "src/common/decorator"
import { JwtAuthGuard, PermissionGuard } from "src/common/guard"
import { UserService } from "./user.service"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { UserEntity } from "./entity"
import { ChangeBannerDto, ChangeBlookDto } from "./dto"
import { PermissionService } from "src/permission/permission.service"
import Permission from "src/permission/enum/permission.enum"

@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiTags("users")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService, private permissionService: PermissionService) {}

    @Get("me")
    @ApiOkResponse()
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ excludeExtraneousValues: true, groups: ["self"] })
    async getMe(@GetCurrentUser() user: User): Promise<UserEntity> {
        return new UserEntity(await this.userService.getUserWithBlooks(user.id))
    }

    @Post("me/changeavatar")
    @ApiOkResponse()
    changeAvatar(@GetCurrentUser() user: User, @Body() dto: ChangeBlookDto): Promise<void> {
        return this.userService.changeAvatar(user, dto)
    }

    @Post("me/changebanner")
    @ApiOkResponse()
    changeBanner(@GetCurrentUser() user: User, @Body() dto: ChangeBannerDto): Promise<void> {
        return this.userService.changeBanner(user, dto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ excludeExtraneousValues: true })
    @Get(":reference")
    async getUser(@Param("reference") reference: string): Promise<UserEntity> {
        return new UserEntity(await this.userService.getUserPublicWithBlooks(reference))
    }

    @Permissions([Permission.BLACKLIST_USER, Permission.BAN_USER])
    @Get("me/test")
    test() {
        return this.permissionService.getUserPermissions(2)
    }
}
