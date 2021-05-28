export class Message {
    constructor(init?:Partial<Message>) { 
        Object.assign(this, init);
    }

    IsSuccess: boolean;
    Payload: any;
    Message: string;
}