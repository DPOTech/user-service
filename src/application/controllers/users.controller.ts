import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { UserSignUpCommand } from 'src/infrastructure/commands';
import { UserSignInQuery } from 'src/infrastructure/queries';
import { AppService } from 'src/infrastructure/services/app.service';
import { UserSignInViewModel, UserSignUpViewModel } from 'src/infrastructure/viewmodels';
@Controller('api/users')
export class UserController {
  constructor(private readonly appService: AppService, private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  async signup(@Body() viewModel: UserSignUpViewModel) {
    try {
      return await this.commandBus.execute(new UserSignUpCommand(viewModel.UserName, viewModel.Password));
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async signin(@Body() viewModel: UserSignInViewModel) {
    try {
      return await this.queryBus.execute(new UserSignInQuery(viewModel.UserName, viewModel.Password));
    } catch (error) {
      return error;
    }
  }

  /*@EventPattern('user-signup')
  async getNotifications(data: Record<string, unknown>) {
    console.log(data);
  }*/
}
