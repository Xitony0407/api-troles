import { Module } from '@nestjs/common';
import { SaboresService } from './sabores.service';
import { SaboresController } from './sabores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabor } from './entities/sabore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sabor])],
  controllers: [SaboresController],
  providers: [SaboresService],
})
export class SaboresModule {}
