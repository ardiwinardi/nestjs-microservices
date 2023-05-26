import { Order } from '@nestjs-microservices/shared/constant';
import {
  CreateProductDto,
  PageOptionsDto,
  UpdateProductDto,
} from '@nestjs-microservices/shared/dto';
import { PageEntity } from '@nestjs-microservices/shared/entity';
import { Product } from '@nestjs-microservices/shared/schema';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel({
      name: createProductDto.name,
      price: createProductDto.price,
      stock: createProductDto.stock,
    });
    return createdProduct.save();
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const items = await this.productModel
      .find()
      .sort({
        [`${pageOptionsDto.orderBy}`]:
          pageOptionsDto.order === Order.ASC ? 1 : -1,
      })
      .skip(pageOptionsDto.skip)
      .limit(pageOptionsDto.limit)
      .exec();

    const itemCount = await this.productModel.find().count();

    return new PageEntity({
      data: items,
      itemCount,
      pageOptionsDto,
    });
  }

  async findOne(id: string) {
    const item = await this.productModel.findById(id).exec();
    if (!item) throw new RpcException('Product Not Found');
    return item;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const item = await this.productModel.findByIdAndUpdate(id, {
      name: updateProductDto.name,
      price: updateProductDto.price,
      stock: updateProductDto.stock,
    });

    if (!item) throw new RpcException('Product Not Found');
    return item;
  }

  async remove(id: string) {
    const item = await this.productModel.findByIdAndRemove(id);
    if (!item) throw new RpcException('Product Not Found');
    return item;
  }
}
