import {
  CreatePurchaseOrderDto,
  FindAllPurchaseOrderDto,
  UpdatePurchaseOrderDto,
  UpdateStatusPurchaseOrderDto,
} from '@nestjs-microservices/shared/dto';
import { ParseObjectIdPipe } from '@nestjs-microservices/shared/pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseOrdersService } from './purchase-orders.service';

@Controller('purchase-orders')
@ApiTags('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.create(createPurchaseOrderDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: FindAllPurchaseOrderDto) {
    return this.purchaseOrdersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.purchaseOrdersService.findOne({
      id,
      options: { withProducts: true, withCustomer: true },
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto
  ) {
    return this.purchaseOrdersService.update(id, updatePurchaseOrderDto);
  }

  @Patch('/status/:id')
  updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateStatusPurchaseOrderDto: UpdateStatusPurchaseOrderDto
  ) {
    return this.purchaseOrdersService.updateStatus(
      id,
      updateStatusPurchaseOrderDto
    );
  }
}
