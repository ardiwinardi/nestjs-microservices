import { LoginDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/schema';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const userObservable = this.client.send('validateUser', loginDto);
    return await firstValueFrom(userObservable);
  }

  login(user: User) {
    return this.client.send('login', user);
  }
}
