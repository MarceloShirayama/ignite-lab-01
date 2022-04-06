import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  findById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }
}