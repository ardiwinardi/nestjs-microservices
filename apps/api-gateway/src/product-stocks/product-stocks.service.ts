import {
  CreateProductStockDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductStocksService {
  constructor(@Inject('PRODUCT_STOCK_SERVICE') private client: ClientProxy) {}

  create(createProductStockDto: CreateProductStockDto) {
    return this.client.send('product-stock.create', createProductStockDto);
  }

  findByProductId(id: string, pageOptionsDto: PageOptionsDto) {
    return this.client.send('product-stock.findByProductId', {
      id,
      ...pageOptionsDto,
    });
  }
}
