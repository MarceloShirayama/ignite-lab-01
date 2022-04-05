import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateProductInput = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create({ customerId, productId }: CreateProductInput) {
    const productNotExists = !!(await this.prisma.purchase.findUnique({
      where: { id: productId },
    }));

    if (productNotExists) {
      throw new Error('product not found');
    }

    return this.prisma.purchase.create({ data: { customerId, productId } });
  }
}
