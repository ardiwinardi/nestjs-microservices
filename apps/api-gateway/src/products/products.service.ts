import {
  CreateProductDto,
  PageOptionsDto,
  UpdateProductDto,
} from '@nestjs-microservices/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  create(createProductDto: CreateProductDto) {
    return this.client.send('product.create', createProductDto);
  }

  findAll(pageOptionsDto: PageOptionsDto) {
    return this.client.send('product.findAll', pageOptionsDto);
  }

  findOne(id: string) {
    return this.client.send('product.findOne', { id });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.client.send('product.update', { id, ...updateProductDto });
  }

  remove(id: string) {
    return this.client.send('product.remove', { id });
  }
}
