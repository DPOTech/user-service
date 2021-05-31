import { Inject } from "@nestjs/common";
import { EventPublisher, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { Md5 } from "md5-typescript";
import { IUserEventStoreService } from "src/infrastructure/eventstore/interfaces";
import { Message } from "src/infrastructure/http/Message";
import { UserSignInQuery } from "src/infrastructure/queries";
import { IUserService } from "src/infrastructure/services/interfaces";

@QueryHandler(UserSignInQuery)
export class UserSignInQueryHandler implements IQueryHandler<UserSignInQuery>{
    constructor(
        @Inject('IUserService') private readonly service: IUserService,
        @Inject('IUserEventStoreService') private readonly eventStoreService: IUserEventStoreService,
        private readonly publisher: EventPublisher,
        private readonly jwtService: JwtService) {

    }
    execute = async (query: UserSignInQuery): Promise<any> => {
        var user = await this.service.findByUserNameAsync(query.userName);
        if (!user)
            return new Message({ IsSuccess: false, Message: 'Tài khoản không tồn tại trong hệ thống' });
        let hashPassword = Md5.init(query.passWord);
        if (user.Password !== hashPassword)
            return new Message({ IsSuccess: false, Message: 'Mật khẩu không trùng khớp' });
        let payload = { Id: user.Id, UserName: user.UserName };
        let token = await this.jwtService.signAsync(payload);
        var result = { Id: user.Id, UserName: user.UserName, Token: token };
        return new Message({ IsSuccess: true, Payload: result });
    }
}