import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/createBill.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillService {
    constructor(private readonly prisma: PrismaService) { }

    async createBill(dataCreate: CreateBillDto) {
        try {
            let data = await this.prisma.bill.create({
                data: {
                    ...dataCreate,
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now()),
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
    async getCartByUserId(userId: number) {
        try {
            let data = await this.prisma.bill.findMany({
                where: {
                    userId: userId
                }
            })
            if (!data) {
                throw {
                    message: "Error Service"
                }
            }
            return { data }
        } catch (err) {

            return { err }
        }
    }

}
