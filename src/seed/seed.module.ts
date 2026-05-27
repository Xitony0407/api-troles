import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Rol } from '../roles/entities/role.entity';
import { Sabor } from '../sabores/entities/sabore.entity';
import { ProductoBase } from '../productos-base/entities/productos-base.entity';
import { Topping } from '../toppings/entities/topping.entity';
import { MetodoPago } from '../metodos-pago/entities/metodos-pago.entity';
import { EstadoOrden } from '../estados-orden/entities/estados-orden.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rol,
      Sabor,
      ProductoBase,
      Topping,
      MetodoPago,
      EstadoOrden,
      Usuario,
    ]),
  ],

  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
