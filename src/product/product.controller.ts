import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findallProduct();
  }

  @Get('allproductname')
  getAllProductName() {
    return this.productService.getAllProductNameWithId();
  }

  //when i wrote this code only god and i knew how it works but now only gods nows it you change anything here you need to change other files also
  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 10 }]))
  async createProduct(
    @UploadedFiles() files: { image?: Express.Multer.File[] },
    @Body() createProductDto: CreateProductDto,
    @Req() req,
  ) {
    try {
      if (!files || !files['image'] || files['image'].length === 0) {
        throw new BadRequestException('Image file is missing.');
      }

      const image = files['image'][0];
      const createdProduct = await this.productService.createProduct(
        createProductDto,
        image,
        req.user,
      );

      return createdProduct;
    } catch (error) {
      // Handle errors and return an appropriate response
      throw new BadRequestException('Invalid input or file upload');
    }
  }
  

  @Get(':id')
  async getProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Put('updatebyid/:id')
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProductById(id, product);
  }

  @Delete('deletebyid/:id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleleteProductById(id);
  }
}

















// @Post()
  // // @UseGuards(AuthGuard())
  // @UseInterceptors(FileFieldsInterceptor([{
  //   name:'image', maxCount: 1}]))
  // async createProduct(
  //   @Body()
  //   product: CreateProductDto,
  //   @Req() req,
  //   @UploadedFile() files:{image?:Express.Multer.File[]},
  // ): Promise<Product> {
  //   const {image} = files;
  //   const imageUrl = image? image[0].path : null
  //   return this.productService.createProduct(product, req.user);
  // }

  // @Post()
  // @UseGuards(AuthGuard())
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'image', maxCount: 1 }, // Assuming you want to upload a single image
  // ]))
  // async createProduct(
  //   @Body()
  //   product: CreateProductDto,
  //   @UploadedFile() files:{image?:Express.Multer.File[]},
  //   @Req() req,
  // ): Promise<Product> {
  //   const image = files['image'] ? files['image'][0] : undefined;
  //   return this.productService.createProduct(product,req.user,image);
  // }

  //   @Post()
  // @UseGuards(AuthGuard())
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'image', maxCount: 1 }, // Assuming you want to upload a single image
  // ]))
  // async createProduct(
  //   @Body() product: CreateProductDto,
  //   @UploadedFiles() files: { image?: Express.Multer.File[] },
  //   @Req() req,
  // ): Promise<Product> {
  //   try {
  //     if (!files || !files['image'] || files['image'].length === 0) {
  //       throw new BadRequestException('Image file is missing.');
  //     }

  //     const image = files['image'][0];
  //     return this.productService.createProduct(product, req.user, image);
  //   } catch (error) {
  //     // Handle any errors here (e.g., validation errors or other exceptions)
  //     throw new BadRequestException('Invalid input or file upload');
  //   }
  // }

  // @Get(':id')
  // async getProductnamewithID(
  //   @Param('id')
  //   id: string,
  // ): Promise<Product> {
  //   return this.productService.findProductById(id);
  // }