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
import { EventSourcingModule } from 'event-sourcing-nestjs';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/users?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      reconnectInterval:1000,
      reconnectTries:10
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    EventSourcingModule.forRoot({
      mongoURL: 'mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/user?retryWrites=true&w=majority',
    })
  ],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    UserSignUpCommandHandler,
    UserSignUpEventHandler,
    { provide: 'IRepository', useClass: Repository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IService', useClass: Service },
    { provide: 'IUserService', useClass: UserService }
  ],
})
export class AppModule { }
