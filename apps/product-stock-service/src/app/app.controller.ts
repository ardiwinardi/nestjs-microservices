import {
  CreateProductStockDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('product-stock.create')
  create(@Payload() createProductStockDto: CreateProductStockDto) {
    return this.appService.create(createProductStockDto);
  }

  @MessagePattern('product-stock.findByProductId')
  findByProductId(@Payload() pageOptionDto: PageOptionsDto & { id: string }) {
    return this.appService.findByProductId(pageOptionDto.id, pageOptionDto);
  }
}
