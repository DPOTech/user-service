import { JSONEventType } from "@eventstore/db-client";

type UserSignupEventType = JSONEventType<
    'user-signup',
    {
        Id: string;
        UserName: string;
        Password: string;
    }
>;

type UserChangeInformationType = JSONEventType<
    'user-change-infomation',
    {
        Id: string;
        UserName: string;
        Password: string;
    }
>;

export type UserEventType = UserSignupEventType | UserChangeInformationType;