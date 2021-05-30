import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://administrator:q*@ZbB9cf6za@103.199.18.93:5672'],
            queue: 'nodejs_queue',
            queueOptions: {
                durable: false
            },
        },
    });
    app.listen(()=>{
        console.log('Microservice started!');
    });
}
bootstrap();
