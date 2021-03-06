import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.findAll();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.findEnrollmentsByStudentId(student.id);
  }

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentsService.getUserByAuthUserId(user.sub);
  // }
}
