import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CarritosService } from './carritos.service';

@Controller('carritos')
export class CarritosController {
  constructor(private readonly carritosService: CarritosService) {}

  @Get(':id_usuario')
  findOne(@Param('id_usuario') id_usuario: string) {
    return this.carritosService.findOne(id_usuario);
  }

  @Post('agregar')
  addItem(@Body() body: { id_usuario: string; item: any }) {
    return this.carritosService.addItem(body.id_usuario, body.item);
  }

  @Delete('vaciar/:id_usuario')
  clearCarrito(@Param('id_usuario') id_usuario: string) {
    return this.carritosService.clearCarrito(id_usuario);
  }
}
