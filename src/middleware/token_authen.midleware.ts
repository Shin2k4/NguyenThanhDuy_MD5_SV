import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export interface ReqToken extends Request {
    data: User
}

@Injectable()
export class TokenAuthenMidleware implements NestMiddleware {
    constructor(private prisma: PrismaService) { }
    async use(req: ReqToken, res: Response, next: NextFunction) {
        
        try {
            let token = req.headers.token || req.body.token || req.query.token || null
            if (!token) throw {
                message: " token invalid "
            }

            let tokenData = (verify(token, process.env.JWT_KEY) as User);
            if (!tokenData) throw {
                message: " token invalid "
            }

            let user = await this.prisma.user.findUnique({
                where: {
                    userName: tokenData.userName
                }
            })

            if (user == null) throw {
                message: " token invalid "
            }
            if (user.updatedAt != tokenData.updatedAt) throw {
                message: " token invalid "
            }

            req.data = user

            next();
        } catch (err) {
            return res.status(500).json({
                message: err.message ? err.message : [
                    " Lỗi ko xác định! "
                ]
            })
        }
        
    }
}
