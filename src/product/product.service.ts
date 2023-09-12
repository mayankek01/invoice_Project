import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../auth/schemas/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import path from 'path';
import * as fs from 'fs';
import { FileUpload } from './file-upload.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel = mongoose.Model<Product>,
  ) {}

  async findallProduct(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    image: FileUpload,
    user: User,
  ) {
    const data = Object.assign(createProductDto, { user: user._id });

    const newProduct = new this.productModel({
      ...createProductDto,
      imageUrl: '/uploads/' + image.originalname, // Adjust the path as needed
    });

    // Save the product to the database
    const createdProduct = await newProduct.save();

    return createdProduct;
  }

  async findProductById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('This is an Invalid ID');
    }
    try {
      const product = await this.productModel.findById(id);
      return product;
      
    } catch (error) {
      throw new NotFoundException(
        'the Product you are looking for does not exist',
      );
    }
  }

  async getAllProductNameWithId(): Promise<
    { id: string; product_name: string }[]
  > {
    try {
      const products = await this.productModel
        .find({}, '_id product_name')
        .exec();

      const productNamesWithId = products.map((product) => ({
        id: product._id,
        product_name: product.product_name || 'Product name Cannot be Fetched',
      }));

      return productNamesWithId;
    } catch (error: any) {
      throw new Error('Unable to fetch product names with IDs');
    }
  }

  async updateProductById(
    id: string,
    product: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productModel.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException(
        'The Product you want to update does not exist',
      );
    }
  }

  async deleleteProductById(id: string): Promise<Product> {
    const isValidate = mongoose.isValidObjectId(id);
    if (!isValidate) {
      throw new BadRequestException('This is an Invalid ID');
    }
    try {
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(
        'the Product you want to delete does not exist',
      );
    }
  }
}
