import { DatabaseModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';

import { User, UserSchema } from '@nestjs-microservices/shared/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
