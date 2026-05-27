import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosBaseDto } from './create-productos-base.dto';

export class UpdateProductosBaseDto extends PartialType(CreateProductosBaseDto) {}
