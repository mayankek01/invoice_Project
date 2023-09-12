import { Optional } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmpty,
  IsArray,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({ message: 'Product name Must be a string' })
  readonly product_name: string;

  @IsString({ message: 'Category Must be a string' })
  readonly category: string;

//   @IsNumber()
  readonly hsncode: string;

  @IsNotEmpty()
//   @IsNumber()
  readonly price: number;

  @IsNotEmpty()
//   @IsNumber()
  readonly tax: number;

  @IsNotEmpty()
  @IsString({ message: 'tye Must be a string' })
  readonly type: string;

  @Optional()
  @IsString({ message: 'description Must be a string' })
  readonly description: string;

  @Optional()
  readonly discount: number;

  @Optional()
  readonly quantity: number;

  @Optional()
  readonly purchase_price: number;

  @Optional()
  @IsString({ message: 'barcode Must be a string' })
  readonly barcode: string;

  @Optional()
  @IsEmpty({ message: ' you canNot add User ID' })
  readonly user: User;

  readonly imageUrl: string;
  
  readonly image: Express.Multer.File;

  

  // @IsArray()
  // @IsString({ message: "image : Must be a string" })
  // readonly images: string[];
}
