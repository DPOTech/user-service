import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IUserEventStoreService } from "src/infrastructure/eventstore/interfaces";
import { JSONEventData, JSONEventType } from "@eventstore/db-client";
import { UserEventType } from "src/infrastructure/eventstore/types/users";
import { ClientProxy } from "@nestjs/microservices";

@EventsHandler({} as JSONEventData<UserEventType>)
export class UserSignUpEventHandler implements IEventHandler<JSONEventData<UserEventType>> {
  constructor(@Inject('IUserEventStoreService') private readonly eventStoreService: IUserEventStoreService
    , @Inject('USER_SERVICE') private readonly client: ClientProxy) { }

  async handle(event: JSONEventData<UserEventType>) {
    let streamName = 'user_' + event.data.UserName;
    let result = await this.eventStoreService.appendToStreamAsync(streamName, event);
    if (result.success) {
      //buid to view
      //notify
      switch (event.type) {
        case "user-signup":
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