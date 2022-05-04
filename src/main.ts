import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3005',
    credentials: true,
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
