import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IUserEventStoreService } from "src/infrastructure/eventstore/interfaces";
import { JSONEventData, JSONEventType } from "@eventstore/db-client";
import { UserEventType } from "src/infrastructure/eventstore/types/users";

@EventsHandler({} as JSONEventData<UserEventType>)
export class UserSignUpEventHandler implements IEventHandler<JSONEventData<UserEventType>> {
  constructor(@Inject('IUserEventStoreService') private eventStoreService: IUserEventStoreService) { }

  async handle(event: JSONEventData<UserEventType>) {
    let streamName = 'user_' + event.data.UserName;
    let result = await this.eventStoreService.appendToStreamAsync(streamName, event);
    if (result.success) {
      //buid to view
    }
    //notify
  }
}