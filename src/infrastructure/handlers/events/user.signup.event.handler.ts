import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserSignUpEvent } from "src/domain/events";
import { IUserService } from "src/infrastructure/services/interfaces";

@EventsHandler(UserSignUpEvent)
export class UserSignUpEventHandler implements IEventHandler<UserSignUpEvent> {
  constructor(@Inject('IUserService') private service: IUserService) {}

  handle(event: UserSignUpEvent) {
      debugger;
  }
}