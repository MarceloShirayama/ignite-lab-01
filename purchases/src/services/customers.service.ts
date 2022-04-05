import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateCustomerParams = { authUserId: string };

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  getUserByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  async create({ authUserId }: CreateCustomerParams): Promise<any> {
    return this.prisma.customer.create({ data: { authUserId } });
  }
}
