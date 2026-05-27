import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadosOrdenDto } from './create-estados-orden.dto';

export class UpdateEstadosOrdenDto extends PartialType(CreateEstadosOrdenDto) {}
