import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

type CreateProductInput = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}

  findAll() {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create({ customerId, productId }: CreateProductInput) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('product not found');
    }

    const purchase = this.prisma.purchase.create({
      data: { customerId, productId },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    this.kafkaService.emit('purchases.create-purchase', {
      customer: { authUserId: customer.authUserId },
      product: { id: productId, title: product.title, slug: product.slug },
    } as any);

    return purchase;
  }
}
