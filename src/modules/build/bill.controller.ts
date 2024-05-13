import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/createBill.dto';
import { Response, Request } from 'express';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }
  @Post("createBill")
  async createBill(@Res() res: Response, @Req() req: Request, @Body() body: CreateBillDto) {
    try {
      let { data, err } = await this.billService.createBill(body);
      console.log("data", data);

      if (err) {
        throw {
          message: err.message ? err.mesage : 'Lỗi cart'
        }
      }
      return res.status(200).json({
        message: 'Tạo bill thành công',
        data: data
      })

    } catch (err) {

      return res.status(500).json({
        message: err.mesage ? [err.mesage] : ['lỗi server'],
      })
    }
  }
  @Get(':id')
  async getAllByUserId(@Res() res: Response, @Req() req: Request, @Param('id') id: string) {
    try {

      let { data, err } = await this.billService.getCartByUserId(Number(id))

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
}
