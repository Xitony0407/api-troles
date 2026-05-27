import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosOrdenService } from './estados-orden.service';
import { CreateEstadosOrdenDto } from './dto/create-estados-orden.dto';
import { UpdateEstadosOrdenDto } from './dto/update-estados-orden.dto';

@Controller('estados-orden')
export class EstadosOrdenController {
  constructor(private readonly estadosOrdenService: EstadosOrdenService) {}

  @Post()
  create(@Body() createEstadosOrdenDto: CreateEstadosOrdenDto) {
    return this.estadosOrdenService.create(createEstadosOrdenDto);
  }

  @Get()
  findAll() {
    return this.estadosOrdenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosOrdenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosOrdenDto: UpdateEstadosOrdenDto) {
    return this.estadosOrdenService.update(+id, updateEstadosOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosOrdenService.remove(+id);
  }
}
