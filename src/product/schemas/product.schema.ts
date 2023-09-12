import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  product_name: string;

  @Prop()
  category: string;

  @Prop()
  hsncode: string;

  @Prop()
  tax: number;

  @Prop()
  price: number;

  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop()
  discount: number;

  @Prop()
  quantity: number;

  @Prop()
  purchase_price: number;

  @Prop()
  barcode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;


  @Prop() // Add this line to include the 'image' property
  imageUrl: string;

  // @Prop([String]) // Define an array of strings for image URLs
  // images: string[];
  // @Prop({ type: Schema.Types.ObjectId, ref: 'Customer' })
  // customer: Customer; // Store customer ID here
}

export const ProductSchema = SchemaFactory.createForClass(Product);
