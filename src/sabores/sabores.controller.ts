import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaboresService } from './sabores.service';
import { CreateSaborDto } from './dto/create-sabore.dto';
import { UpdateSaborDto } from './dto/update-sabore.dto';

@Controller('sabores')
export class SaboresController {
  constructor(private readonly saboresService: SaboresService) {}

  @Post()
  create(@Body() createSaborDto: CreateSaborDto) {
    return this.saboresService.create(createSaborDto);
  }

  @Get()
  findAll() {
    return this.saboresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saboresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaborDto: UpdateSaborDto) {
    return this.saboresService.update(+id, updateSaborDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saboresService.remove(+id);
  }
}
