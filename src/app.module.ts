import { Module } from '@nestjs/common';
import { AppController, UserController } from 'src/application/controllers';
import { AppService } from './infrastructure/services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSignUpCommandHandler } from './infrastructure/handlers/commands'
import { UserSignUpEventHandler } from './infrastructure/handlers/events'
import { UserRepository, Repository } from './data/repositories/implements'
import { UserService, Service } from './infrastructure/services/implements';
import { User } from './domain/entities';
import { UserSchema } from './schemas';
import { UserEventStoreService } from './infrastructure/eventstore/implements';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserConsumerController } from './application/controllers/consumers';
import { JwtModule } from '@nestjs/jwt';
import { UserSignInQuery } from './infrastructure/queries';
import { UserSignInQueryHandler } from './infrastructure/handlers/queries';

@Module({
  imports: [
    CqrsModule,
    //với mongo atlas thêm ssl=true
    MongooseModule.forRoot('mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/users?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
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
    { provide: 'IRepository', useClass: Repository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IService', useClass: Service },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserEventStoreService', useClass: UserEventStoreService }
  ],
})
export class AppModule { }
