export class FindOnePurchaseOrderDto {
  id: string;
  options?: { withProducts?: boolean; withCustomer?: boolean };
}
