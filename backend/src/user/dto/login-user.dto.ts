import { IsString , IsEmail } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email : string;

    @IsString()
    pass : string;
}
