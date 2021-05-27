export class UserSignUpEvent {
    constructor(
        public readonly Id: string,
        public readonly UserName: string,
        public readonly Password: string
    ) { }
}