import { Reflector } from "@nestjs/core"
import Permission from "src/permission/enum/permission.enum"

export const Permissions = Reflector.createDecorator<Permission[]>()