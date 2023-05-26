import {
  CreateProductStockDto,
  PageOptionsDto,
} from '@nestjs-microservices/shared/dto';
import { PageEntity } from '@nestjs-microservices/shared/entity';
import { Product, ProductStock } from '@nestjs-microservices/shared/schema';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(ProductStock.name)
    private productStockModel: Model<ProductStock>,
    @Inject('PRODUCT_SERVICE') private client: ClientProxy
  ) {}

  async create(createProductStockDto: CreateProductStockDto) {
    const { productId } = createProductStockDto;

    const productObservable = this.client.send<Product>('product.findOne', {
      id: productId,
    });
    const product = await firstValueFrom(productObservable);

    if (!product) throw new RpcException('Not Found');

    const createdProductStock = new this.productStockModel({
      productId,
      poId: createProductStockDto.poId,
      description: createProductStockDto.description,
      stockAddition: createProductStockDto.stockAddition,
      createdAt: new Date(),
    });
    const item = await createdProductStock.save();

    if (item) {
      product.stock = product.stock + createProductStockDto.stockAddition;
      this.client.send<Product>('product.create', product);
    }

    return item;
  }

  async findByProductId(productId: string, pageOptionsDto: PageOptionsDto) {
    const filter = {
      productId,
    };
    const items = await this.productStockModel.find(filter).exec();

    const itemCount = await this.productStockModel.find(filter).count();

    return new PageEntity({
      data: items,
      itemCount,
      pageOptionsDto,
    });
  }
}
