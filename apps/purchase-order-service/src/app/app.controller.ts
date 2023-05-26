import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import {
  CreatePurchaseOrderDto,
  FindAllPurchaseOrderDto,
  FindOnePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  UpdateStatusPurchaseOrderDto,
} from '@nestjs-microservices/shared/dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('purchase-order.create')
  create(@Payload() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.appService.create(createPurchaseOrderDto);
  }

  @MessagePattern('purchase-order.findAll')
  findAll(@Payload() pageOptionsDto: FindAllPurchaseOrderDto) {
    return this.appService.findAll(pageOptionsDto);
  }

  @MessagePattern('purchase-order.findOne')
  findOne(@Payload() findOnePurchaseOrderDto: FindOnePurchaseOrderDto) {
    return this.appService.findOne(findOnePurchaseOrderDto);
  }

  @MessagePattern('purchase-order.update')
  update(
    @Payload()
    {
      id,
      updatePurchaseOrderDto,
    }: {
      id: string;
      updatePurchaseOrderDto: UpdatePurchaseOrderDto;
    }
  ) {
    return this.appService.update(id, updatePurchaseOrderDto);
  }

  @MessagePattern('purchase-order.updateStatus')
  updateStatus(
    @Payload()
    { id, data }: { id: string; data: UpdateStatusPurchaseOrderDto }
  ) {
    return this.appService.updateStatus(id, data);
  }
}
