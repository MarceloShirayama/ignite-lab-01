import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/purchase';

@Resolver()
export class PurchasesResolver {
  constructor(private service: PurchasesService) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  listPurchases() {
    return this.service.findAll();
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  createPurchase() {
    return;
  }
}
