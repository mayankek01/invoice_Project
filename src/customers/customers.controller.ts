import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CustomersModule } from './customers.module';
import { CustomersService } from './customers.service';
import { Customers } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor( private customerService : CustomersService){}

    @Get()
    async findAll():Promise<Customers[]>{
        return this.customerService.findAll();
    }

    @Get(':id')
    async customerById(
        @Param('id')
        id: string
    ): Promise<Customers>{
        return this.customerService.getCustomerById(id);
    }

    // @Get('getcustomerbynamewithid')
    // async customerByNameWithId(){
    //     return this.customerService.getAllCustomerNameWithId();
    // }

    @Post()
    async createCustomer(
        @Body()
        customer: CreateCustomerDto
    ):Promise<Customers>{
        return this.customerService.createCustomer(customer);
    }

    @Put(":id")
    async updateCustomer(
        @Param('id')
        id: string,
        @Body()
        customer: UpdateCustomerDto
    ): Promise<Customers>{
        return this.customerService.updateCustomerById(id,customer);
    }

    @Delete("deletebyid/:id")
    async DeleteCustomer(
        @Param('id')
        id: string,
    ): Promise<Customers>{
        return this.customerService.deleteById(id);
    }

}
