import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

type Customer = {
  authUserId: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
};

type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

@Controller()
export class PurchasesController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesServices: CoursesService,
    private readonly enrollmentsServices: EnrollmentsService,
  ) {}

  @EventPattern('purchases.create-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getUserByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesServices.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesServices.create({
        title: payload.product.title,
      });
    }

    await this.enrollmentsServices.create({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
