import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create() {
    return;
  }
}
