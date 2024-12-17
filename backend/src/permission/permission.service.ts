import { Injectable } from "@nestjs/common"
import Permission from "./enum/permission.enum"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class PermissionService {
    constructor(private readonly prismaService: PrismaService) {}

    getPermissionsField(permissions: Permission[]): number {
        return this.addPermissions(0, permissions)
    }

    addPermission(permission: number, permissionToAdd: Permission): number {
        return permission | permissionToAdd
    }

    addPermissions(permission: number, permissionsToAdd: Permission[]): number {
        return permissionsToAdd.reduce((acc, p) => acc | p, permission)
    }

    combinePermissions(permissionOne: number, permissionTwo: number): number {
        return permissionOne | permissionTwo
    }

    removePermission(permission: number, permissionToRemove: Permission): number {
        return permission & ~permissionToRemove
    }

    removePermissions(permission: number, permissionsToRemove: Permission[]): number {
        return permissionsToRemove.reduce((acc, p) => acc & ~p, permission)
    }

    hasPermission(permission: number, permissionToCheck: Permission): boolean {
        return (permission & permissionToCheck) === permissionToCheck
    }

    hasPermissions(permission: number, permissionsToCheck: Permission[]): boolean {
        return permissionsToCheck.every((p) => this.hasPermission(permission, p))
    }

    async getUserPermissions(userId: number): Promise<number> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                perms: true,
                group: {
                    select: {
                        perms: true,
                    },
                },
            },
        })

        return this.combinePermissions(user.perms, user.group.perms)
    }
}
