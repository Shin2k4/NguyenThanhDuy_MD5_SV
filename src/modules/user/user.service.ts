import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto) {
        try {
            let user = await this.prisma.user.create({
                data: {
                    ...data,
                    avatar: `/avata.jpg`,
                    // password: await bcrypt.hash(data.password, 10),
                    createdAt: String(Date.now()),
                    updatedAt: String(Date.now())
                }
            })

            return {
                data: user
            }
        } catch (err) {
            return {
                err
            }
        }
    }
    async findByUserName(userName: string) {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    userName: userName
                },

            })

            if (!user) throw {
                message: "user not found!"
            }
            return {
                data: user
            }
        } catch (err) {
            return {
                err
            }
        }
    }

}
