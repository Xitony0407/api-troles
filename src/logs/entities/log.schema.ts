import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  accion: string; 

  @Prop({ type: Object })
  detalles: Record<string, any>; 
}

export const LogSchema = SchemaFactory.createForClass(Log);