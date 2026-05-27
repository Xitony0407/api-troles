import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenDto } from './create-ordene.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {}
