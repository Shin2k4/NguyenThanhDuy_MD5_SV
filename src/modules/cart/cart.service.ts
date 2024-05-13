import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/createCart.dto';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async getCartByUserId(userId: number) {
        try {
            let data = await this.prisma.cart.findMany({
                where: {
                    userId: userId
                }
            })
            if (!data) {
                throw {
                    message: "Error CartService"
                }
            }
            return { data }
        } catch (err) {

            return { err }
        }
    }

    async create(dataCreate: CreateCartDto) {
        try {
            let data = await this.prisma.cart.create({
                data: {
                    ...dataCreate,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })
            if (!data) {
                throw {
                    message: "Error CartService"
                }
            }
        

            return { data }

        } catch (err) {
            return { err }
        }
    }



    async delete(id: number) {
        try {
            let data = await this.prisma.cart.delete({
                where: {
                    id: id
                }
            })
            if (!data) {
                throw {
                    message: "Error CartService"
                }
            }
            return { data }
        } catch (err) {
            return { err }
        }
    }
}