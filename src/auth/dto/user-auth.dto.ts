import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserAuth {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;


    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
     { message: 'Password is weak'},)
    password: string;
}