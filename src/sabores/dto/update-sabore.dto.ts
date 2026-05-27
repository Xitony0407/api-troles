import { PartialType } from '@nestjs/mapped-types';
import { CreateSaborDto } from './create-sabore.dto';

export class UpdateSaborDto extends PartialType(CreateSaborDto) {}
