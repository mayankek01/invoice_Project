import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true
})

export class Customers{

    @Prop()
    name: string;

    @Prop()
    phone: number;

    @Prop()
    email : string;

    @Prop()
    gstin: string;

    @Prop()
    company: string;

    @Prop()
    address: string;

//     @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Product' }] })
//   purchasedProducts: Product[]; // Store product IDs here

}

export const CustomerSchema = SchemaFactory.createForClass(Customers);