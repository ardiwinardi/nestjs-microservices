import {
  CreatePurchaseOrderDto,
  FindAllPurchaseOrderDto,
  FindOnePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  UpdateStatusPurchaseOrderDto,
} from '@nestjs-microservices/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PurchaseOrdersService {
  constructor(@Inject('PURCHASE_ORDER_SERVICE') private client: ClientProxy) {}

  create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.client.send('purchase-order.create', createPurchaseOrderDto);
  }

  findAll(pageOptionsDto: FindAllPurchaseOrderDto) {
    return this.client.send('purchase-order.findAll', pageOptionsDto);
  }

  findOne(findOnePurchaseOrderDto: FindOnePurchaseOrderDto) {
    const { id, options } = findOnePurchaseOrderDto;
    return this.client.send('purchase-order.findOne', {
      id,
      options,
    });
  }

  update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.client.send('purchase-order.update', {
      id,
      updatePurchaseOrderDto,
    });
  }

  updateStatus(
    id: string,
    updateStatusPurchaseOrderDto: UpdateStatusPurchaseOrderDto
  ) {
    return this.client.send('purchase-order.updateStatus', {
      id,
      updateStatusPurchaseOrderDto,
    });
  }
}
