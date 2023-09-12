import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateVendorDto{

    @IsOptional()
    @IsString({message: "Name Must be a string"})
    readonly name: string;
    
    @IsOptional()
    @IsNumber()
    readonly phone: number;

    @IsOptional()
    @IsString({message: "Address Must be a string"})
    readonly address: string;

    @IsOptional()
    @IsString({message:"gstn number should be string"})
    readonly gstin: string;

    @IsOptional()
    @IsString()
    readonly logo: string;

    @IsOptional()
    @IsString()
    readonly upi: string;

    @IsOptional()
    @IsString()
    readonly stamp: string;

}