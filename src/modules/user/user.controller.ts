import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login.dto';
import { sign, verify } from 'jsonwebtoken';
import { hashSync } from 'bcrypt';
import { ReqToken } from 'src/middleware/token_authen.midleware';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      let { err } = await this.userService.create(body);

      if (err) {
        let errMes = "loi chua xac dinh"

        if (err?.meta?.target == "User_userName_key") {
          errMes = "Tên đăng nhập đã tồn tại"
        }

        if (err?.meta?.target == "User_email_key") {
          errMes = "Email đã tồn tại"
        }
        throw {
          message: errMes
        }
      }

      return res.status(200).json({
        message: "đăng ký thành công",
      })

    } catch (err) {

      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi chưa xác định"]
      })
    }
  }

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    try {
      let { err, data } = await this.userService.findByUserName(body.userName);

      if (err) {
        throw err.message ? err : {
          message: "loi chua xac dinh"
        }
      }

      if (data.password != body.password) throw {
        message: "Mat khau khong dung"
      }

      return res.status(200).json({
        token: sign(data, process.env.JWT_KEY, { expiresIn: "1d" }),
        message: "Đăng nhập thành công"
      })

    } catch (err) {
      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi chưa xác định"]
      })
    }
  }

  @Post('getToken')
  async getToken(@Body() body: string, @Req() req: ReqToken, @Res() res: Response) {
    return res.status(200).json({
      data: req.data
    })
  }

}
