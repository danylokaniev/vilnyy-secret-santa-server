import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const authOptions = new DocumentBuilder()
    .setTitle('Villny Secret Santa API')
    .setDescription('# About\nBasic description\n')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'secret_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, authOptions);

  await SwaggerModule.setup('/', app, document);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
