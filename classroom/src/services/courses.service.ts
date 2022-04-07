import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateCourseParams = { title: string; slug?: string };

function stringToSlug(str: string, separator: string): string {
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-/g, separator);
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany();
  }

  findById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async create({ title, slug = stringToSlug(title, '-') }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findFirst({
      where: { slug },
    });

    if (courseAlreadyExists) {
      throw new Error(`Course with title ${title} already exists`);
    }

    return this.prisma.course.create({ data: { title, slug } });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findFirst({ where: { slug } });
  }
}
