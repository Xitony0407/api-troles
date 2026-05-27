import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleToppingDto } from './create-detalle-topping.dto';

export class UpdateDetalleToppingDto extends PartialType(CreateDetalleToppingDto) {}
