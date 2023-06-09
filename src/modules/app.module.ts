import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
dotenv.config();
import { IsAuthenticatedMiddleware } from '../middlewares/is-authenticated/is-authenticated.middleware';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { typeOrmConfig } from 'src/ORM';

import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoryModule,
    AuthModule,
    ClientModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(IsAuthenticatedMiddleware).forRoutes('auth');
    //  .apply(HelmetMiddleware)
    //  .forRoutes(''); // permet d'ajouter des headers contre des attaques...
  }
}
