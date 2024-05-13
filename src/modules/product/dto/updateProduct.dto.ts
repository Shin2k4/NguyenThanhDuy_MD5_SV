import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDTO {
    @IsString()
    name?: string;
    @IsString()
    description?: string;
    @IsNumber()
    quantity?: number;
    @IsNumber()
    price?: number;
    @IsNotEmpty()
    images?: string
    @IsNotEmpty()
    categoryId?: number;
}