import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto{

    @IsNotEmpty()
    @IsString({message: "Must be a string"})
    readonly name: string;
    
    @IsNumber()
    readonly phone: number;

    @IsEmail({},{message: "email Must be a EMAIL"})
    readonly email : string;

    @IsString({message: "GSTIN Must be a string"})
    readonly gstin: string;

    @IsString({message: "Company Must be a string"})
    readonly company: string;

    @IsString({message: "Address Must be a string"})
    readonly address: string;
}