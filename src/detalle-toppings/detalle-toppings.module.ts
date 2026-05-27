import { Module } from '@nestjs/common';
import { DetalleToppingsService } from './detalle-toppings.service';
import { DetalleToppingsController } from './detalle-toppings.controller';
import { DetalleTopping } from './entities/detalle-topping.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleTopping])],
  controllers: [DetalleToppingsController],
  providers: [DetalleToppingsService],
})
export class DetalleToppingsModule {}
