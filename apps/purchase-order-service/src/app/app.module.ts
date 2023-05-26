import {
  DatabaseModule,
  MicroserviceModule,
} from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';

import {
  PurchaseOrder,
  PurchaseOrderProduct,
  PurchaseOrderProductSchema,
  PurchaseOrderSchema,
} from '@nestjs-microservices/shared/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: PurchaseOrder.name, schema: PurchaseOrderSchema },
      { name: PurchaseOrderProduct.name, schema: PurchaseOrderProductSchema },
    ]),
    MicroserviceModule('USER_SERVICE'),
    MicroserviceModule('PRODUCT_SERVICE'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
