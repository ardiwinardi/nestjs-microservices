import {
  DatabaseModule,
  MicroserviceModule,
} from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import {
  ProductStock,
  ProductStockSchema,
} from '@nestjs-microservices/shared/schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ProductStock.name, schema: ProductStockSchema },
    ]),
    MicroserviceModule('PRODUCT_SERVICE'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
