import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCustomerDto{

    @IsOptional()
    @IsString({message: "Must be a string"})
    readonly name: string;
    
    @IsOptional()
    @IsNumber()
    readonly phone: number;

    @IsOptional()
    @IsEmail({},{message: "email Must be a string"})
    readonly email : string;

    @IsOptional()
    @IsString({message: "GSTIN Must be a string"})
    readonly gstin: string;

    @IsOptional()
    @IsString({message: "Company Must be a string"})
    readonly company: string;

    @IsOptional()
    @IsString({message: "Address Must be a string"})
    readonly address: string;
}