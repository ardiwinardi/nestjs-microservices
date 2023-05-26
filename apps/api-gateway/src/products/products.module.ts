import { MicroserviceModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [MicroserviceModule('PRODUCT_SERVICE')],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
