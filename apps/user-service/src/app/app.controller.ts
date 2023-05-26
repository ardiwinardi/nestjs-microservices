import { ParseObjectIdPipe } from '@nestjs-microservices/shared/pipe';
import { Controller } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '@nestjs-microservices/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @MessagePattern('user.findAll')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('user.findOne')
  findOne(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern('user.findByUsername')
  async findByUsername(@Payload('username') username: string) {
    return await this.appService.findByUsername(username);
  }

  @MessagePattern('user.update')
  update(
    @Payload('id', ParseObjectIdPipe) id: string,
    @Payload() updateUserDto: UpdateUserDto
  ) {
    return this.appService.update(id, updateUserDto);
  }

  @MessagePattern('user.remove')
  remove(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.remove(id);
  }
}
