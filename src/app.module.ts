import { Module } from '@nestjs/common';
import { AppController } from 'src/application/controllers/app.controller';
import { AppService } from './infrastructure/services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSignUpHandler } from './infrastructure/handlers/commands'
import { UserRepository } from './data/repositories/implements'
import { UserService } from './infrastructure/services/implements';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://minhnd:abcde12345-@cluster0.nfcfl.mongodb.net/users?retryWrites=true&w=majority'), CqrsModule],
  controllers: [AppController],
  providers: [AppService, UserSignUpHandler, UserRepository, UserService],
})
export class AppModule { }
