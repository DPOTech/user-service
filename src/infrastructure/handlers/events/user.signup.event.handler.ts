import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IUserEventStoreService } from "src/infrastructure/eventstore/interfaces";
import { JSONEventData, JSONEventType } from "@eventstore/db-client";
import { UserEventType } from "src/infrastructure/eventstore/types/users";
import { ClientProxy } from "@nestjs/microservices";
import { IUserService } from "src/infrastructure/services/interfaces";

@EventsHandler({} as JSONEventData<UserEventType>)
export class UserSignUpEventHandler implements IEventHandler<JSONEventData<UserEventType>> {
  constructor(@Inject('IUserEventStoreService') private readonly eventStoreService: IUserEventStoreService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    @Inject('IUserService') private readonly _service: IUserService) { }

  async handle(event: JSONEventData<UserEventType>) {
    let streamName = 'user_' + event.data.UserName;
    let result = await this.eventStoreService.appendToStreamAsync(streamName, event);
    if (result.success) {
      switch (event.type) {
        case "user-signup":
          //buid to view
          await this._service.signup(event.data.Id, event.data.UserName, event.data.Password);
          //notify
          this.client.emit('user-signup', { Id: event.data.Id, UserName: event.data.UserName });
          break;
        case "user-change-infomation":
          break;
        default:
          break;
      }
    }
  }
}