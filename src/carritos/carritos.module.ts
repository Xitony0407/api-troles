import { Module } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritosController } from './carritos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrito, CarritoSchema } from './entities/carrito.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carrito.name, schema: CarritoSchema }])],
  controllers: [CarritosController],
  providers: [CarritosService],
})
export class CarritosModule {}