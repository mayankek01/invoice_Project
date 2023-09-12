import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customers } from './schemas/customer.schema';
import mongoose from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name)
    private customerModel = mongoose.Model<Customers>,
  ) {}

  async findAll(): Promise<Customers[]> {
    const customers = await this.customerModel.find();
    return customers;
  }

  async createCustomer(customer: CreateCustomerDto): Promise<Customers> {
    const customerInfo = await this.customerModel.create(customer);
    return customerInfo;
  }

  async updateCustomerById(
    id: string,
    customer: UpdateCustomerDto,
  ): Promise<Customers> {
    const isValidate = mongoose.isValidObjectId(id);
    if (!isValidate) {
      throw new BadRequestException('This is an Invalid ID');
    }
    try {
      return await this.customerModel.findByIdAndUpdate(id, customer, {
        new: true,
        runValidators: true,
      });
    } catch (error: any) {
      throw new NotFoundException(
        'The customer you want to update does not exist',
      );
    }
  }

  async getCustomerById(id: string): Promise<Customers> {
    const isValidate = mongoose.isValidObjectId(id);
    if (!isValidate) {
      throw new BadRequestException('This is a Invalid ID');
    }

    try {
      const Customer = await this.customerModel.findById(id);
      if (!Customer) {
        throw new Error();
      }
      return Customer;
    } catch (error: any) {
      throw new NotFoundException(
        'the Customer you want to Find does not exist',
      );
    }
  }

  async deleteById(id: string): Promise<Customers> {
    const isValidate = mongoose.isValidObjectId(id);
    if (!isValidate) {
      throw new BadRequestException('This is an Invalid ID');
    }
    try {
      return await this.customerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(
        'the customer you want to delete does not exist',
      );
    }
  }

  // async getAllCustomerNameWithId(): Promise<{ id: string; name: string }[]> {
  //     try {
  //       const customers = await this.customerModel.find({}, '_id name').exec();

  //       const customerNamesWithId = customers.map((customer) => ({
  //         id: customer._id,
  //         name: customer.product_name || "Customer name Cannot be Fetched",
  //       }));

  //       return customerNamesWithId;
  //     } catch (error:any) {
  //       throw new Error('Unable to fetch customer names with IDs');
  //     }
  //   }
}
