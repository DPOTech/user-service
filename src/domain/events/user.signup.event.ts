import { StorableEvent } from "event-sourcing-nestjs";

export class UserSignUpEvent extends StorableEvent {
    eventAggregate = 'user';
    eventVersion = 1;
    id = '_id_';
    constructor(
        public readonly Id: string,
        public readonly UserName: string,
        public readonly Password: string
    ) {
        super();
    }
}