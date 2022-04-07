import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

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
  @EventPattern('purchases.create-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log(payload);
  }
}
