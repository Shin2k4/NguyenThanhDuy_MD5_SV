
import { IsString, Length } from "class-validator";
export class LoginUserDto {
    @Length(4, 20)
    userName: string;
    @IsString()
    password: string;
}