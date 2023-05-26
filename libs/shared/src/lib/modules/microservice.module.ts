import { ClientsModule, Transport } from '@nestjs/microservices';

export function MicroserviceModule(name: string) {
  return ClientsModule.register([
    {
      name,
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    },
  ]);
}
