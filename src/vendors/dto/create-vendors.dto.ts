import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVendorDto{

    

    @IsNotEmpty()
    @IsString({message: "Name Must be a string"})
    readonly name: string;
    
    @IsNumber()
    readonly phone: number;

    @IsString({message: "Address Must be a string"})
    readonly address: string;

    @IsString({message:"gstn number should be string"})
    readonly gstin: string;

    @IsString()
    readonly logo: string;

    @IsString()
    readonly upi: string;

    @IsString()
    readonly stamp: string;

}