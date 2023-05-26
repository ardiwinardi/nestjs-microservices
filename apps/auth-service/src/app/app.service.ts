import { LoginDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/schema';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const userObservable = this.client.send<User>('user.findByUsername', {
      username,
    });

    const user = await firstValueFrom(userObservable);

    if (user) {
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
