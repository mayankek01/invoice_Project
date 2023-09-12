import { IsArray, IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'product name Must be a string' })
  readonly product_name: string;

  @IsOptional()
  @IsString({ message: 'category Must be a string' })
  readonly category: string;

  @IsOptional()
  @IsString({ message: 'hsncode Must be a string' })
  readonly hsncode: string;
  
  @IsOptional()
  @IsNumber()
  readonly tax: number;

  @IsOptional()
  @IsString({ message: 'type Must be a string' })
  readonly type: string;

  @IsOptional()
  @IsString({ message: 'description Must be a string' })
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly discount: number;

  @IsOptional()
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsNumber()
  readonly purchase_price: number;

  @IsOptional()
  @IsString({ message: 'barcode Must be a string' })
  readonly barcode: string;

  @IsOptional()
  @IsEmpty({ message: 'you canNot add User ID' })
  readonly user: User;

  // @IsArray()
  // @IsString({ message: "Must be a string" })
  // readonly images: string[];

  @IsOptional()
  readonly imageUrl: string;
  readonly image: File;
}
