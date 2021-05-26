import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserSignUpCommand } from 'src/infrastructure/commands';
import { AppService } from 'src/infrastructure/services/app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly commandBus: CommandBus) { }

  @Get()
  getHello(): string {
    this.commandBus.execute(new UserSignUpCommand("username", "password"));
    return this.appService.getHello();
  }
}
