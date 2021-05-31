import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController, UserController } from 'src/application/controllers';
import { AppService } from './infrastructure/services/app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSignUpCommandHandler } from './infrastructure/handlers/commands'
import { UserSignUpEventHandler } from './infrastructure/handlers/events'
import { UserService } from './infrastructure/services/implements';
import { UserEventStoreService } from './infrastructure/eventstore/implements';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserConsumerController } from './application/controllers/consumers';
import { JwtModule } from '@nestjs/jwt';
import { UserSignInQueryHandler } from './infrastructure/handlers/queries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './domain/entities';
import { OdataUsersMiddleware } from './infrastructure/middlewares';

@Module({
  imports: [
    CqrsModule,
    //với mongo atlas thêm ssl=true
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/users?retryWrites=true&w=majority&ssl=true',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://administrator:q*@ZbB9cf6za@103.199.18.93:5672'],
          queue: 'nodejs_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    JwtModule.register({
      secret: 'nmLyRD=&=dKhNg3v'
    })
  ],
  controllers: [
    AppController,
    UserController,
    UserConsumerController
  ],
  providers: [
    AppService,
    UserSignUpCommandHandler,
    UserSignUpEventHandler,
    UserSignInQueryHandler,
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserEventStoreService', useClass: UserEventStoreService }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OdataUsersMiddleware).forRoutes('api/v1/odata/users');
  }
}
