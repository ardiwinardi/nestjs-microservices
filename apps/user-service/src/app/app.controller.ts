import { ParseObjectIdPipe } from '@nestjs-microservices/shared/pipe';
import { Controller } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '@nestjs-microservices/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @MessagePattern('getUsers')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('getUserById')
  findOne(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern('getUserByUsername')
  async findByUsername(@Payload('username') username: string) {
    return await this.appService.findByUsername(username);
  }

  @MessagePattern('updateUser')
  update(
    @Payload('id', ParseObjectIdPipe) id: string,
    @Payload() updateUserDto: UpdateUserDto
  ) {
    return this.appService.update(id, updateUserDto);
  }

  @MessagePattern('deleteUser')
  remove(@Payload('id', ParseObjectIdPipe) id: string) {
    return this.appService.remove(id);
  }
}
