import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { Orden } from './entities/orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetalleOrden } from '../detalle-orden/entities/detalle-orden.entity';
import { DetalleTopping } from '../detalle-toppings/entities/detalle-topping.entity';
import { Topping } from '../toppings/entities/topping.entity';
import { Sabor } from '../sabores/entities/sabore.entity';
import { ProductoBase } from '../productos-base/entities/productos-base.entity';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orden, 
      DetalleOrden, 
      DetalleTopping, 
      Topping, 
      Sabor, 
      ProductoBase
    ]),
    LogsModule,
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
