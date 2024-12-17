import { Injectable } from "@nestjs/common"
import { Redis } from "ioredis"

@Injectable()
export class RedisService extends Redis {
    constructor() {
        super({
            port: +process.env.REDIS_PORT,
            db: +process.env.REDIS_DB,
        })
    }
}