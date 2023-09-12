import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from './schemas/vendors.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Vendors', schema: VendorSchema}])],
  providers: [VendorsService],
  controllers: [VendorsController]
})
export class VendorsModule {}
