import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { CalculateExecutionTimeOfRequestInterceptor } from './interceptors/calculate-time-request/calculate-time-request.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // on configure Morgan afin de nous aider aux logs
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');

  // on configure les pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({ origin: '*' });
  // on calcule le temps d'execution des chaque requete afin d'en optimiser si possible
  app.useGlobalInterceptors(new CalculateExecutionTimeOfRequestInterceptor());

  // on configure Swagger Open Api
  const config = new DocumentBuilder()
    .setTitle('mosala API')
    .setDescription('Open API de mosala APP')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // on lance notre application

  const configService = app.get(ConfigService);
  console.log(`http://localhost:${configService.get('APP_PORT')}`);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
