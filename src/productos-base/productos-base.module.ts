import { Module } from '@nestjs/common';
import { ProductosBaseService } from './productos-base.service';
import { ProductosBaseController } from './productos-base.controller';
import { ProductoBase } from './entities/productos-base.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoBase])],
  controllers: [ProductosBaseController],
  providers: [ProductosBaseService],
})
export class ProductosBaseModule {}
