import {
  DatabaseModule,
  MicroserviceModule,
} from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';

import { Payment, PaymentSchema } from '@nestjs-microservices/shared/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MicroserviceModule('PURCHASE_ORDER_SERVICE'),
    MicroserviceModule('PRODUCT_STOCK_SERVICE'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
