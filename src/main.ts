import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3005', 'https://accounts.google.com'],
      // origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      // allowedHeaders: ['content-type'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Freelancer')
    .setDescription('The Freelancer API Description')
    .setVersion('1.0')
    .addTag('freelancer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/', app, document);

  await app.listen(3000);
}
bootstrap();
