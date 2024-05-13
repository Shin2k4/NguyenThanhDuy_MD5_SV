import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      let { data, err } = await this.productService.findAll();
      if (err) {
        throw {
          message: "không tìm thấy "
        }
      }
      return res.status(200).json({
        message: "tìm data thành công", data,
      })

    } catch (err) {

      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi chưa xác định"]
      })
    }
  }


  @Post()
  async create(@Body() body: any, @Res() res: Response) {

    try {

      let { data } = await this.productService.create({
        name: body.name,
        price: Number(body.price),
        quantity: Number(body.quantity),
        description: body.description,
        images: String(body.images),
        categoryId: Number(body.categoryId)
      });

      if (!data) {

        throw {
          message: "thêm sản phẩm thaat bai",

        }
      }

      return res.status(200).json({
        message: "thêm sản phẩm thành công",
        data: data
      })

    } catch (err) {

      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi chưa xác định"]
      })
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {

    try {
      let result = await this.productService.delete(Number(id));

      return res.status(200).json({
        message: 'Xóa sản phẩm thành công.'
      });

    } catch (err) {

      return res.status(500).json({
        message: 'Đã xảy ra lỗi.'
      });
    }
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updateData: CreateProductDTO, @Res() res: Response) {

    try {

      const updatedProduct = await this.productService.update(id, updateData);

      if (!updatedProduct) {

        return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
      }


      return res.status(200).json({ message: 'Cập nhật sản phẩm thành công.' });
    } catch (error) {

      return res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
  }
}
