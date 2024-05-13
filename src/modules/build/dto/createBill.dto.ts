import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBillDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    productId: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    Total: number;
}