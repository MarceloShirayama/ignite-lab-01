import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany();
  }

  findById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }
}
