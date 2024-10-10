import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // primary swagger document
    const config = new DocumentBuilder()
        .setTitle('Projeto Senac')
        .setDescription('')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(Number(process.env.BACKEND_PORT) || 3000);
}
bootstrap();
