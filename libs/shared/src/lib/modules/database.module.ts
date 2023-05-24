import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
