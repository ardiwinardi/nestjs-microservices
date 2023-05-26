import { MicroserviceModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';
import { ProductStocksController } from './product-stocks.controller';
import { ProductStocksService } from './product-stocks.service';

@Module({
  imports: [MicroserviceModule('PRODUCT_STOCK_SERVICE')],
  controllers: [ProductStocksController],
  providers: [ProductStocksService],
})
export class ProductStocksModule {}
