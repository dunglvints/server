import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    type: String,
    default: uuidV4,
  })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
