import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }
    async create(dataCreate: CreateProductDTO) {
        try {
            let product = await this.prisma.product.create({
                data: {
                    ...dataCreate,
                    images: '',
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })

            return {
                data: product
            }
        } catch (err) {
            // console.log(err);

            return {
                err
            }
        }
    }


    async findAll() {
        try {
            let product = await this.prisma.product.findMany()
            // console.log(product);

            return {
                data: product
            }
        } catch (err) {
            return {
                err
            }
        }
    }

    async delete(id: number) {
        try {
            let deleteProduct = await this.prisma.product.delete({
                where: {
                    id: id
                }
            })
            return deleteProduct
        } catch (err) {

        }
    }

    async update(id: number, data: UpdateProductDTO) {
        console.log(data);

        try {
            let product = await this.prisma.product.update({
                where: {
                    id: Number(id)
                },

                data: {
                    ...data,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })

            return {
                data: product
            }
        } catch (err) {
            console.log(err);

            return {
                err
            }
        }
    }
}

