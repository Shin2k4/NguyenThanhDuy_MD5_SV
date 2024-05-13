import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';
import { Response, Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async createCart(@Res() res: Response, @Req() req: Request, @Body() body: CreateCartDto) {
    try {
      
      let { data, err } = await this.cartService.create(body);

      if (err) {
        
        throw {
          message: err.message ? err.mesage : 'Error CartController'
        }
      }
      
      return res.status(200).json({
        message: 'Create Cart Success',
        data: data
      })

    } catch (err) {
      
      return res.status(500).json({
        message: err.mesage ? [err.mesage] : ['Internal Server Error'],
      })
    }
  }

  

  @Get(':id')
  async getAllByUserId(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {

      let { data, err } = await this.cartService.getCartByUserId(Number(id))

      if (err) {
        throw {
          message: err.message ? err.mesage : 'Error CartController'
        }
      }

      return res.status(200).json({
        message: 'Get Data Success',
        data: data
      })

    } catch (err) {
      return res.status(500).json({
        message: err.mesage ? [err.mesage] : ['Internal Server Error'],
      })
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {

    try {
      let result = await this.cartService.delete(Number(id));

      return res.status(200).json({
        message: 'Xóa sản phẩm thành công.'
      });

    } catch (err) {

      return res.status(500).json({
        message: 'Đã xảy ra lỗi.'
      });
    }
  }
}