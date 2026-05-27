import { Module } from '@nestjs/common';
import { EstadosOrdenService } from './estados-orden.service';
import { EstadosOrdenController } from './estados-orden.controller';
import { EstadoOrden } from './entities/estados-orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoOrden])],
  controllers: [EstadosOrdenController],
  providers: [EstadosOrdenService],
})
export class EstadosOrdenModule {}
