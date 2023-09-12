import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true
})

export class Vendors{

    @Prop()
    readonly name: string;
  
    @Prop()
    readonly phone: number;

    @Prop()
    readonly address: string;

    @Prop()
    readonly gstin: string;

    @Prop()
    readonly logo: string;

    @Prop()
    readonly upi: string;

    @Prop()
    readonly stamp: string;

//     @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Product' }] })
//   purchasedProducts: Product[]; // Store product IDs here

}

export const VendorSchema = SchemaFactory.createForClass(Vendors);