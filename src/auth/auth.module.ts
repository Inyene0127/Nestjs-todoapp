import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cors from 'cors';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(cors({ origin: '*', credentials: true})).forRoutes('*')
  }
}
