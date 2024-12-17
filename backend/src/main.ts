import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from "cookie-parser"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: [
            "https://purpet.xyz",
            "https://dev.purpet.xyz",
        ],
        credentials: true,
    })
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    app.use(cookieParser())
    app.setGlobalPrefix("/v1")

    const config = new DocumentBuilder()
        .setTitle("Purpet")
        .setDescription("Documentation for Purpet API")
        .setVersion("1.0.0")
        .addCookieAuth("access_token")
        .addCookieAuth("refresh_token")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("v1/docs", app, document)

    const configService = app.get(ConfigService)

    const port = configService.get<number>("BACKEND_PORT")
    await app.listen(port)
}
bootstrap()