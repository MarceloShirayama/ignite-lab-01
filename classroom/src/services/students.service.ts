import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateStudentParams = { authUserId: string };

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  findById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({ where: { authUserId } });
  }

  getUserByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({ where: { authUserId } });
  }

  create({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({ data: { authUserId } });
  }
}
