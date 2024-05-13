import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';


@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateCategoryDTO) {
        try {
            let category = await this.prisma.category.create({
                data: {
                    ...data,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })
            return {
                data: category
            }
        } catch (err) {
            return {
                err
            }
        }
    }
    async findAll() {
        try {
            let category = await this.prisma.category.findMany()

            return {
                data: category
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async delete(id: number) {
        try {
            let deleteProduct = await this.prisma.category.delete({
                where: {
                    id: id
                }
            })
            return deleteProduct
        } catch (err) {

        }
    }
    async update(id: number, data: CreateCategoryDTO) {
        try {
            let newCategory = await this.prisma.category.create({
                data: {
                    ...data,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })

            return {
                data: newCategory
            }
        } catch (err) {
            // console.log(err);

            return {
                err
            }
        }
    }
}
