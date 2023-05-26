import {
  CreateProductStockDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductStocksService } from './product-stocks.service';

@Controller('product-stocks')
@ApiTags('product-stocks')
export class ProductStocksController {
  constructor(private readonly productStocksService: ProductStocksService) {}

  @Post()
  create(@Body() createProductStockDto: CreateProductStockDto) {
    return this.productStocksService.create(createProductStockDto);
  }

  @Get('/productId/:id')
  findByProductId(
    @Param('id') id: string,
    @Query() pageOptionDto: PageOptionsDto
  ) {
    return this.productStocksService.findByProductId(id, pageOptionDto);
  }
}
