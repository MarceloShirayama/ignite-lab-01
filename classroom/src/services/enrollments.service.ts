import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type GetByCourseIdAndStudentIdParams = {
  courseId: string;
  studentId: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  findEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  getByCourseIdAndStudentId({
    courseId,
    studentId,
  }: GetByCourseIdAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, canceledAt: null },
    });
  }
}
