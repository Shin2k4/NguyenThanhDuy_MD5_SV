import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      let { data, err } = await this.categoryService.findAll();
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
  async create(@Body() createCategory: CreateCategoryDTO, @Res() res: Response) {
    try {
      let { data } = await this.categoryService.create(createCategory);
      
      return res.status(200).json({
        message: "tạo doanh mục thành công",
        data: data,
      })
      

    } catch (err) {

      return res.status(500).json({
        message: err.message ? [err.message] : ["Lỗi chưa xác định"]
      })
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    console.log(id);
    
    try {
      let result = await this.categoryService.delete(Number(id));

      return res.status(200).json({
        message: 'Xóa doanh mục thành công.'
      });

    } catch (err) {

      return res.status(500).json({
        message: 'Đã xảy ra lỗi.'
      });
    }
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updateData: CreateCategoryDTO, @Res() res: Response) {

    try {

      const updatedProduct = await this.categoryService.update(id, updateData);

      if (!updatedProduct) {

        return res.status(404).json({ message: 'Không tìm thấy doanh mục sản phẩm.' });
      }


      return res.status(200).json({ message: 'Cập doanh mục thành công.' });
    } catch (error) {

      return res.status(500).json({ message: 'Đã xảy ra lỗi.' });
    }
  }

}
