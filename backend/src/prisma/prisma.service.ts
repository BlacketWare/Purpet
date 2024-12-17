import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: `postgresql://${config.get("POSTGRES_USER")}:${config.get("POSTGRES_PASSWORD")}@${config.get("POSTGRES_HOST")}:${config.get("POSTGRES_PORT")}/${config.get("POSTGRES_DB")}?schema=public`,
                },
            },
        })
    }
}
