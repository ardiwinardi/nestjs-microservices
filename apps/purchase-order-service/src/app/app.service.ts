import {
  Order,
  PurchaseOrderStatus,
} from '@nestjs-microservices/shared/constant';
import {
  CreatePurchaseOrderDto,
  FindAllPurchaseOrderDto,
  FindOnePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  UpdateStatusPurchaseOrderDto,
} from '@nestjs-microservices/shared/dto';
import { PageEntity } from '@nestjs-microservices/shared/entity';
import {
  PurchaseOrder,
  PurchaseOrderProduct,
} from '@nestjs-microservices/shared/schema';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(PurchaseOrder.name)
    private purchaseOrderModel: Model<PurchaseOrder>,
    @InjectModel(PurchaseOrderProduct.name)
    private purchaseOrderProductModel: Model<PurchaseOrderProduct>,
    @Inject('PRODUCT_SERVICE') private productServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { customerId, products } = createPurchaseOrderDto;

    const createPurchaseOrder = new this.purchaseOrderModel({
      customerId,
      createdAt: new Date(),
      status: PurchaseOrderStatus.IN_PROGRESS,
    });

    const item = await createPurchaseOrder.save();

    if (item) {
      products.forEach(async (purchasedProduct) => {
        const productObservable = this.productServiceClient.send(
          'product.findOne',
          { id: purchasedProduct.id }
        );
        const product = await firstValueFrom(productObservable);

        await new this.purchaseOrderProductModel({
          poId: item._id,
          product: product,
          quantity: purchasedProduct.quantity,
        }).save();
      });
    }

    return item;
  }

  async findAll(pageOptionsDto: FindAllPurchaseOrderDto) {
    let query = {};
    if (pageOptionsDto.dateFrom && pageOptionsDto.dateTo) {
      const { dateFrom, dateTo } = pageOptionsDto;
      query = {
        createdAt: {
          $gte: new Date(new Date(dateFrom).setHours(0, 0, 0)),
          $lt: new Date(new Date(dateTo).setHours(23, 59, 59)),
        },
      };
    }

    const items = await this.purchaseOrderModel
      .find(query)
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const data = items;
    const itemCount = await this.purchaseOrderModel.find(query).count();

    return new PageEntity({
      data,
      itemCount,
      pageOptionsDto,
    });
  }

  async findOne(findOnePurchaseOrderDto: FindOnePurchaseOrderDto) {
    const { id, options } = findOnePurchaseOrderDto;

    const item = await this.purchaseOrderModel.findById(id).exec();
    if (!item) throw new RpcException('Purchase order not found');

    if (options?.withProducts) {
      const items = await this.purchaseOrderProductModel
        .find({ poId: id })
        .exec();

      item.products = items.map((item) => {
        return {
          id: item._id.toString(),
          poId: item.poId,
          product: item.product,
          quantity: item.quantity,
          returnedAt: item.returnedAt,
        };
      });
    }

    if (options?.withCustomer) {
      const customerObservable = this.userServiceClient.send('user.findOne', {
        id: item.customerId,
      });
      const customer = await firstValueFrom(customerObservable);
      item.customer = {
        username: customer.username,
      };
    }

    return item;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const { products } = updatePurchaseOrderDto;

    const item = await this.purchaseOrderModel.findById(id);
    if (!item) throw new RpcException('Not Found');

    products.forEach(async (purchasedProduct) => {
      await this.purchaseOrderProductModel.findByIdAndUpdate(
        purchasedProduct.id,
        {
          quantity: purchasedProduct.quantity,
        }
      );
    });

    return item;
  }

  async updateStatus(
    id: string,
    { status, paymentId }: UpdateStatusPurchaseOrderDto
  ) {
    let canceledAt = undefined;
    let paidAt = undefined;

    if (status === PurchaseOrderStatus.PAID) {
      paidAt = new Date();
    } else if (status === PurchaseOrderStatus.CANCELED) {
      canceledAt = new Date();
    }

    const item = await this.purchaseOrderModel.findByIdAndUpdate(id, {
      status,
      paymentId,
      canceledAt,
      paidAt,
    });

    if (!item) throw new RpcException('Not Found');
    return item;
  }
}
