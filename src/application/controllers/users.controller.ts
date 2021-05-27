import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserSignUpCommand } from 'src/infrastructure/commands';
import { AppService } from 'src/infrastructure/services/app.service';
import { UserSignUpViewModel } from 'src/infrastructure/viewmodels';
@Controller('api/users')
export class UserController {
  constructor(private readonly appService: AppService, private readonly commandBus: CommandBus) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post()
  async signup(@Body() viewModel: UserSignUpViewModel) {
    return await this.commandBus.execute(new UserSignUpCommand(viewModel.UserName, viewModel.Password));
  }
}
