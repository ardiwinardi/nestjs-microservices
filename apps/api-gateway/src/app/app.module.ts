import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentsModule } from '../payments/payments.module';
import { ProductStocksModule } from '../product-stocks/product-stocks.module';
import { ProductsModule } from '../products/products.module';
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    ProductStocksModule,
    PurchaseOrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
