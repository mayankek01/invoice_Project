import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendors } from './schemas/vendors.schema';
import mongoose, { Mongoose, isValidObjectId } from 'mongoose';
import { CreateVendorDto } from './dto/create-vendors.dto';
import { UpdateVendorDto } from './dto/update-vendors.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel(Vendors.name)
    private vendorModel = mongoose.Model<Vendors>,
  ) {}

  async findAll(): Promise<Vendors[]> {
    return this.vendorModel.find();
  }

  async create(vendor: CreateVendorDto): Promise<Vendors[]> {
    //create the vendors
    const vendorCreated = await this.vendorModel.create(vendor);
    return vendorCreated;
  }

  async getById(id: string): Promise<Vendors> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException(
        'this is an invalid ID or vendor does not exist',
      );
    }
    try {
      const vendor = await this.vendorModel.findById(id);
      return vendor;
    } catch (error) {
      throw new NotFoundException('vendor does not exist');
    }
  }

  async updateById(id: string, vendor: UpdateVendorDto): Promise<Vendors> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('invalid ID or user does not exist');
    }
    try {
      return await this.vendorModel.findByIdAndUpdate(id, vendor, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new NotFoundException('somthing is not right');
    }
  }

  async deleteById(id: string): Promise<Vendors> {
    const isValid = isValidObjectId(id);
    if (!isValid) {
      throw new BadRequestException('invalid ID or user does not exist');
    }
    try {
      const deletedVendor = await this.vendorModel.findByIdAndDelete(id);
      return deletedVendor;
    } catch (error) {
      throw new Error('somthing is not right');
    }
  }

  // async getAllLogos():Promise<Vendors[]>{                                         //get all the logos
  //     const filterLogos = this.vendorModel.find({},'logo')
  //     return filterLogos;
  // }

  // async getAllGstin(gstin: string):Promise<Vendors[]>{                                        //get all the gstin
  //     const filtergstin =  await this.vendorModel.find({gstin})
  //     return filtergstin;
  // }

  // async getAllUpi(upi : string): Promise<Vendors[]>{                                          //get all the UPI
  //     const filteredUpi = await this.vendorModel.find({upi})
  //     return filteredUpi
  // }

  // async getAllStamp(stamp: string): Promise<Vendors[]>{                                       //get all the stamps
  //     const filteredStamps = await this.vendorModel.find({stamp})
  //     return filteredStamps;
  // }
}
