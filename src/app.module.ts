import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './product/multer.config';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MulterModule.register(multerConfig),
    ProductModule,
    CustomersModule,
    AuthModule,
    VendorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  