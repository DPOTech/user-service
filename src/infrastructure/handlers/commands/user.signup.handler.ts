import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { User } from "src/domain/entities";
import { UserSignUpCommand } from "src/infrastructure/commands";
import { UserService } from "src/infrastructure/services/implements";

@CommandHandler(UserSignUpCommand)
export class UserSignUpHandler implements ICommandHandler<UserSignUpCommand>{
    constructor(private service: UserService, private publisher: EventPublisher) {

    }
    async execute(command: UserSignUpCommand): Promise<void> {
        let user = new User();
        user.SignUp(command.userName, command.passWord);
        var data = this.service.findByUserName('administrator');
        const exitedUser = this.publisher.mergeObjectContext(
            await this.service.findByUserName('administrator'),
        );
        console.log(exitedUser);
    }
}