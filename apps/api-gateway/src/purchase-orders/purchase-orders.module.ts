import { MicroserviceModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
  imports: [MicroserviceModule('PURCHASE_ORDER_SERVICE')],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
