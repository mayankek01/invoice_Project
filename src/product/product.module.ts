import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Module({
  imports:[
    // MongooseModule.forRoot('mongodb://localhost/your-database-name'),
    MulterModule.register(multerConfig), // Configure Multer
    AuthModule,
    MongooseModule.forFeature([{name:'Product' , schema: ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {

}
