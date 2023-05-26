import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PurchaseOrderProduct } from './purchase-order-product.schema';
import { User } from './user.schema';

export type PurchaseOrderDocument = HydratedDocument<PurchaseOrder>;

@Schema({ collection: 'purhase_orders' })
export class PurchaseOrder {
  @Prop()
  id: string;

  @Prop()
  customerId: string;

  @Prop()
  paymentId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  paidAt: Date;

  @Prop()
  canceledAt: Date;

  @Prop()
  status: string;

  @Prop({ type: Object, required: false })
  customer?: Partial<User>;

  @Prop({ type: Array, required: false })
  products?: Array<Partial<PurchaseOrderProduct>>;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
