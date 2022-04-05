import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Product } from 'src/http/graphql/models/product';

type CreateProductInput = Pick<Product, 'title'>;

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
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create({ title }: CreateProductInput): Promise<Product> {
    const slug = stringToSlug(title, '-');

    const alreadyExists = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (alreadyExists) {
      throw new Error('another product with same slug already exists');
    }

    return this.prisma.product.create({ data: { title, slug } });
  }
}
