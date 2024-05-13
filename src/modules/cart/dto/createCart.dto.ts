
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    productId: number;
    @IsNumber()
    quantity: number;
    @IsNumber()
    total: number;
}