import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { User } from "src/domain/entities";
import { UserSignUpCommand } from "src/infrastructure/commands";
import { IUserService } from "src/infrastructure/services/interfaces";

@CommandHandler(UserSignUpCommand)
export class UserSignUpHandler implements ICommandHandler<UserSignUpCommand>{
    constructor(@Inject('IUserService') private service: IUserService, private publisher: EventPublisher) {

    }
    async execute(command: UserSignUpCommand): Promise<void> {
        let user = new User();
        user.SignUp(command.userName, command.passWord);
        const exitedUser = this.publisher.mergeObjectContext(
            await this.service.findByUserName('administrator'),
        );
    }
}