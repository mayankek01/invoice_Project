import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendors } from './schemas/vendors.schema';
import { CreateVendorDto } from './dto/create-vendors.dto';
import { UpdateVendorDto } from './dto/update-vendors.dto';

@Controller('vendors')
export class VendorsController {
    constructor(private vendorService : VendorsService){}

    @Get()
    async findAll(){
        return this.vendorService.findAll()
    }

    @Get(':id')
    async getVendorById(
        @Param('id')
        id : string
    ):Promise<Vendors>{
        return this.vendorService.getById(id);
    }

    @Post()
    async addNewVendor(
        @Body()
        vendor : CreateVendorDto,
    ):Promise<Vendors[]>{
        const vendorCreated = this.vendorService.create(vendor)
        return vendorCreated;
    }

    @Put(':id')
    async updateVendorById(
        @Param('id')
        id: string,
        @Body()
        vendor : UpdateVendorDto,
    ):Promise<Vendors>{
        const vendorUpdated = this.vendorService.updateById(id,vendor)
        return vendorUpdated;
    }

    @Delete(':id')
    async deleteById(
        @Param('id')
        id: string
    ):Promise<Vendors>{
        return this.vendorService.deleteById(id);
    }

    
}
