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
import { AgencyModule } from './agency/agency.module';
import { AccountModule } from './account/account.module';
import { SubAgencyModule } from './sub-agency/sub-agency.module';
import { ExpeditorsModule } from './expeditors/expeditors.module';
import { RecipientsModule } from './recipients/recipients.module';
import { OperationsModule } from './operations/operations.module';

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
    AgencyModule,
    AccountModule,
    SubAgencyModule,
    ExpeditorsModule,
    RecipientsModule,
    OperationsModule,
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
