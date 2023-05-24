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

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @MessagePattern('getProducts')
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.appService.findAll(pageOptionsDto);
  }

  @MessagePattern('getProductById')
  findOne(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern('updateProduct')
  update(
    @Payload('id', ParseObjectIdPipe) id: string,
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.appService.update(id, updateProductDto);
  }

  @MessagePattern('deleteProduct')
  remove(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.remove(id);
  }
}
