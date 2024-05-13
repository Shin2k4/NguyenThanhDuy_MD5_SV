import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenAuthenMidleware } from '../../middleware/token_authen.midleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenAuthenMidleware)
      .forRoutes({
        path: 'user/getToken', method: RequestMethod.POST, version: '1'
      })
  }
}
