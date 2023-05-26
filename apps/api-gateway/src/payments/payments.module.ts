import { MicroserviceModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [MicroserviceModule('PAYMENT_SERVICE')],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
