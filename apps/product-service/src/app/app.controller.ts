import { ParseObjectIdPipe } from '@nestjs-microservices/shared/pipe';
import { Controller } from '@nestjs/common';

import {
  CreateProductDto,
  PageOptionsDto,
  UpdateProductDto,
} from '@nestjs-microservices/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('product.create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @MessagePattern('product.findAll')
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.appService.findAll(pageOptionsDto);
  }

  @MessagePattern('product.findOne')
  findOne(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern('product.update')
  update(
    @Payload()
    { id, updateProductDto }: { id: string; updateProductDto: UpdateProductDto }
  ) {
    return this.appService.update(id, updateProductDto);
  }

  @MessagePattern('product.remove')
  remove(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.remove(id);
  }
}
