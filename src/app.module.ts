import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
// import { AdminChatModule } from './modules/admin-chat/admin-chat.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { BillModule } from './modules/build/bill.module';
import { TokenAuthenMidleware } from './middleware/token_authen.midleware';
import { AdminChatModule } from './modules/admin-chat/admin-chat.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, CategoryModule, CartModule, BillModule, AdminChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenAuthenMidleware)
      .forRoutes({
        path: 'user/getToken', method: RequestMethod.POST, version: '1'
      })
  }
}

