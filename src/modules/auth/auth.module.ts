import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from './user/entities/user.entity';
import { UserRepository } from './user/repository/user.repositoy';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // forwardRef(() => TalentModule),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [UserService, UserRepository],
  // exports: [UserService],
})
export class AuthModule {}
