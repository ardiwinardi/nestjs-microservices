import { Controller } from '@nestjs/common';

import {
  CreatePaymentDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('payment.create')
  create(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.appService.create(createPaymentDto);
  }

  @MessagePattern('payment.findAll')
  findAll(@Payload() pageOptionsDto: PageOptionsDto) {
    return this.appService.findAll(pageOptionsDto);
  }

  @MessagePattern('payment.create')
  findOne(@Payload('id') id: string) {
    return this.appService.findOne(id);
  }
}
