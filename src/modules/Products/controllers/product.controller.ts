import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct() {
    const products = await this.productService.findAll();

    return {
      data: products,
    };
  }

  @Get(':id')
  async getDetailProduct(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Missing id', 400);
    }

    const exisProduct = await this.productService.findOne({ _id: id });

    if (!exisProduct) {
      throw new HttpException('Product not found', 404);
    }

    return {
      data: exisProduct,
    };
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    if (
      !createProductDto.name ||
      !createProductDto.price ||
      !createProductDto.image ||
      !createProductDto.description
    ) {
      throw new HttpException('Missing body', 400);
    }

    const exitsProduct = await this.productService.findOne({
      name: createProductDto.name,
    });

    if (exitsProduct) {
      throw new HttpException('Product already exists', 400);
    }

    const createProduct = await this.productService.create(createProductDto);

    return {
      id: createProduct._id,
    };
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (!id) {
      throw new HttpException('Missing id', 400);
    }

    const exisProduct = await this.productService.findOne({ _id: id });

    if (!exisProduct) {
      throw new HttpException('Product not found', 404);
    }

    try {
      await this.productService.updateProduct(id, updateProductDto);
      return {
        msg: 'Product updated successfully',
      };
    } catch (error) {
      throw new HttpException('Cannot update product', 400);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Missing id', 400);
    }

    const exisProduct = await this.productService.findOne({ _id: id });

    if (!exisProduct) {
      throw new HttpException('Product not found', 404);
    }

    try {
      await this.productService.deleteProduct(id);
      return {
        msg: 'Product deleted successfully',
      };
    } catch (error) {
      throw new HttpException('Cannot deleted product', 400);
    }
  }
}
