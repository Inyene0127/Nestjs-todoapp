import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserAuth {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;


    @IsString()
    @MinLength(8)
    @MaxLength(15)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
    //  { message: 'Password is weak'},)
    password: string;
}