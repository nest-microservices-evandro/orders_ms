import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create_order')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('find_all_orders')
  findAll() {
    return 'This action returns all orders';
    // return this.ordersService.findAll();
  }

  @MessagePattern('find_one_order')
  findOne(@Payload() id: number) {
    return `This action returns a #${id} order`;
    // return this.ordersService.findOne(id);
  }

  @MessagePattern('change_status_order')
  changeStatus(@Payload() updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${updateOrderDto.id} order`;
    // return this.ordersService.changeStatus(updateOrderDto.id, updateOrderDto);
  }
}
