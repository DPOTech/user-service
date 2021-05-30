export class UserSignInQuery {
    constructor(
        public readonly userName: string,
        public readonly passWord: string,
    ) { }
}