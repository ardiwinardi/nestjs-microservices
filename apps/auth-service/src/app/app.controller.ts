import { Controller } from '@nestjs/common';

import { LoginDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.validateUser')
  handleValidateUser(@Payload() loginDto: LoginDto) {
    return this.appService.validateUser(loginDto);
  }

  @MessagePattern('auth.login')
  handleLogin(@Payload() user: User) {
    return this.appService.login(user);
  }
}
