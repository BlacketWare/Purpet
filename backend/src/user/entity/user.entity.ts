import { Punishment, Banner, Blook, Group, User, UserStats } from "@prisma/client"
import { Expose } from "class-transformer"

export class UserEntity {
    @Expose()
    readonly username: string

    @Expose()
    readonly id: number

    @Expose()
    readonly createdAt: Date

    @Expose()
    readonly updatedAt: Date

    @Expose()
    readonly stats: UserStats

    @Expose()
    readonly tokens: number

    @Expose()
    readonly avatar: Blook

    @Expose()
    readonly banner: Banner

    @Expose()
    readonly group: Group

    @Expose()
    readonly blooks: any

    @Expose()
    readonly perms: number

    @Expose({ groups: ["self"]})
    readonly lastDailyTokenClaim: Date

    @Expose({ groups: ["self"]})
    readonly friends: User[]

    @Expose({ groups: ["self"]})
    readonly punishments: Punishment[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}

export default UserEntity