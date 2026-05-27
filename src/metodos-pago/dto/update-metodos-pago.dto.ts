import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodoPagoDto } from './create-metodos-pago.dto';

export class UpdateMetodoPagoDto extends PartialType(CreateMetodoPagoDto) {}
