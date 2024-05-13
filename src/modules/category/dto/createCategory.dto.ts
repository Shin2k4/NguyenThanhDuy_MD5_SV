import { Category } from "@prisma/client"
import { IsString } from "class-validator";
export class CreateCategoryDTO {
    @IsString()
    name: string;

}