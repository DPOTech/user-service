import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { exception } from "console";
import { Guid } from "guid-typescript";
import { Md5 } from "md5-typescript";
import { User } from "src/domain/entities";
import { UserSignUpCommand } from "src/infrastructure/commands";
import { IUserService } from "src/infrastructure/services/interfaces";

@CommandHandler(UserSignUpCommand)
export class UserSignUpCommandHandler implements ICommandHandler<UserSignUpCommand>{
    constructor(@Inject('IUserService') private service: IUserService, private publisher: EventPublisher) {

    }
    async execute(command: UserSignUpCommand): Promise<void> {
        let existedUser = await this.service.findByUserNameAsync(command.userName);
        if(existedUser)
            throw new exception('Username đã tồn tại trong hệ thống');
        let id = Guid.create().toString();
        let hashPassword = Md5.init(command.passWord);
        let user = this.publisher.mergeObjectContext(
            new User()
        );
        user.signup(id, command.userName, hashPassword);
        user.commit();
    }
}