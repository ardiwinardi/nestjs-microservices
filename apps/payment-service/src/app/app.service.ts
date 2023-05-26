import {
  Order,
  PurchaseOrderStatus,
} from '@nestjs-microservices/shared/constant';
import {
  CreatePaymentDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { PageEntity } from '@nestjs-microservices/shared/entity';
import { Payment, PurchaseOrder } from '@nestjs-microservices/shared/schema';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @Inject('PURCHASE_ORDER_SERVICE')
    private purchaseOrderServiceClient: ClientProxy,
    @Inject('PRODUCT_STOCK_SERVICE')
    private productStockServiceClient: ClientProxy
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { poId, poProductId } = createPaymentDto;
    // check is po has been paid
    const payment = await this.paymentModel.findOne({ poId }).exec();
    if (payment) throw new HttpException('Purchase order already paid', 409);

    // get products list
    const purchaseOrderObserver =
      this.purchaseOrderServiceClient.send<PurchaseOrder>(
        'purchase-order.findOne',
        { id: poId, options: { withProducts: true } }
      );
    const purchaseOrder = await firstValueFrom(purchaseOrderObserver);
    const { products } = purchaseOrder;

    // get total amount for payment
    const totalAmount = products.reduce(
      (value, item) => item.quantity * item.product.price + value,
      0
    );

    // create payment data
    const createPayment = new this.paymentModel({
      poId,
      poProductId,
      amount: totalAmount,
      createdAt: new Date(),
    });
    const item = await createPayment.save();

    if (item) {
      // update product stock
      products.forEach(async (purchasedProduct) => {
        this.productStockServiceClient.send('product-stock.create', {
          productId: purchasedProduct.product.id,
          poId,
          description: 'sold',
          stockAddition: -purchasedProduct.quantity,
        });
      });

      // update purchase order status
      this.purchaseOrderServiceClient.send('purchase-order.updateStatus', {
        id: purchaseOrder.id,
        data: {
          paymentId: item._id,
          status: PurchaseOrderStatus.PAID,
        },
      });
    }
    return item;
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const items = await this.paymentModel
      .find()
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const data = items;
    const itemCount = await this.paymentModel.find().count();

    return new PageEntity({
      data,
      itemCount,
      pageOptionsDto,
    });
  }

  findOne(id: string) {
    return this.paymentModel.findById(id).exec();
  }
}
