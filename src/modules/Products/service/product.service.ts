import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.model.find().exec();
  }

  async findOne(query): Promise<Product> {
    return await this.model.findOne(query).exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = {
      ...createProductDto,
      createdAt: new Date(),
    };

    const createdProduct = new this.model(newProduct);
    return await createdProduct.save();
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.model.findByIdAndUpdate(id, updateProductDto).exec();
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
