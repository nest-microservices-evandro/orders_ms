import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationOrderDto } from './dto/pagination-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({ data: createOrderDto });
  }

  async findAll(paginationOrderDto: PaginationOrderDto) {
    const { page, limit, status } = paginationOrderDto;

    const total = await this.prismaService.order.count({
      where: {
        status,
      },
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data: await this.prismaService.order.findMany({
        where: {
          status,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          perPage: limit,
          totalItems: total,
        },
      },
    };
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order not found',
        error: 'Not Found',
      });
    }

    return order;
  }

  async changeStatus(ChangeStatusDto: ChangeStatusDto) {
    await this.findOne(ChangeStatusDto.id);

    return this.prismaService.order.update({
      where: {
        id: ChangeStatusDto.id,
      },
      data: {
        status: ChangeStatusDto.status,
      },
    });
  }
}
