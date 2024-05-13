
import { IsEmail, IsString, Length } from "class-validator";
export class CreateUserDto {
    @IsEmail()
    email: string;
    @Length(4, 20)
    userName: string;
    @IsString()
    @Length(3, 20)
    password: string;
} 