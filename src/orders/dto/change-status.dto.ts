import { OrderStatus } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class ChangeStatusDto {
  @IsUUID()
  id: string;

  @IsEnum(OrderStatus, { each: true })
  status: OrderStatus;
}
