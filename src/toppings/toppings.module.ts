import { Module } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { ToppingsController } from './toppings.controller';
import { Topping } from './entities/topping.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Topping])],
  controllers: [ToppingsController],
  providers: [ToppingsService],
})
export class ToppingsModule {}
