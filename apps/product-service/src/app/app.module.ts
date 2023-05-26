import { DatabaseModule } from '@nestjs-microservices/shared/module';
import { Module } from '@nestjs/common';

import { Product, ProductSchema } from '@nestjs-microservices/shared/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
