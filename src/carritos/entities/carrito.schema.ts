import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarritoDocument = HydratedDocument<Carrito>;

@Schema({ timestamps: true })
export class Carrito {
  @Prop({ required: true })
  id_usuario: string;

  @Prop({ type: Array, default: [] })
  items: any[]; 

  @Prop({ default: 0 })
  total_temporal: number;
}

export const CarritoSchema = SchemaFactory.createForClass(Carrito);