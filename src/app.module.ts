import { Module } from '@nestjs/common';
import { AppController } from 'src/application/controllers/app.controller';
import { AppService } from './infrastructure/services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSignUpHandler } from './infrastructure/handlers/commands'
import { UserRepository, Repository } from './data/repositories/implements'
import { UserService, Service } from './infrastructure/services/implements';
import { User } from './domain/entities';
import { UserSchema } from './schemas';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/users?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    UserSignUpHandler,
    { provide: 'IRepository', useClass: Repository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IService', useClass: Service },
    { provide: 'IUserService', useClass: UserService }
  ],
})
export class AppModule { }
