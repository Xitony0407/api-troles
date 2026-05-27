import { Module } from '@nestjs/common';
import { DetalleOrdenService } from './detalle-orden.service';
import { DetalleOrdenController } from './detalle-orden.controller';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleOrden])],
  controllers: [DetalleOrdenController],
  providers: [DetalleOrdenService],
})
export class DetalleOrdenModule {}
