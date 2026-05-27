import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleToppingsService } from './detalle-toppings.service';
import { CreateDetalleToppingDto } from './dto/create-detalle-topping.dto';
import { UpdateDetalleToppingDto } from './dto/update-detalle-topping.dto';

@Controller('detalle-toppings')
export class DetalleToppingsController {
  constructor(private readonly detalleToppingsService: DetalleToppingsService) {}

  @Post()
  create(@Body() createDetalleToppingDto: CreateDetalleToppingDto) {
    return this.detalleToppingsService.create(createDetalleToppingDto);
  }

  @Get()
  findAll() {
    return this.detalleToppingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleToppingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleToppingDto: UpdateDetalleToppingDto) {
    return this.detalleToppingsService.update(+id, updateDetalleToppingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleToppingsService.remove(+id);
  }
}
