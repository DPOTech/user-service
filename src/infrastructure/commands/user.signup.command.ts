export class UserSignUpCommand {
    constructor(
        public readonly userName: string,
        public readonly passWord: string,
    ) { }
}