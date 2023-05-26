import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const RedisModule: MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
};
