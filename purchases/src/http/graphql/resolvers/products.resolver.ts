// import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
// import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private service: ProductsService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.service.findAll();
  }
}
