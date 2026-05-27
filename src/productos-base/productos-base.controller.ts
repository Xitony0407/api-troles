import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosBaseService } from './productos-base.service';
import { CreateProductosBaseDto } from './dto/create-productos-base.dto';
import { UpdateProductosBaseDto } from './dto/update-productos-base.dto';

@Controller('productos-base')
export class ProductosBaseController {
  constructor(private readonly productosBaseService: ProductosBaseService) {}

  @Post()
  create(@Body() createProductosBaseDto: CreateProductosBaseDto) {
    return this.productosBaseService.create(createProductosBaseDto);
  }

  @Get()
  findAll() {
    return this.productosBaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosBaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductosBaseDto: UpdateProductosBaseDto) {
    return this.productosBaseService.update(+id, updateProductosBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosBaseService.remove(+id);
  }
}
