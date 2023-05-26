import {
  CreatePaymentDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.client.send('payment.create', createPaymentDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return this.client.send('payment.findAll', pageOptionsDto);
  }

  findOne(id: string) {
    return this.client.send('payment.findOne', { id });
  }
}
