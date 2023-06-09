import { CreateUserDto, UpdateUserDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/schema';
import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const itemIsExist = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (itemIsExist) throw new HttpException('User already exists', 409);

    const createduser = new this.userModel({
      username: createUserDto.username,
      password: await bcrypt.hash(
        createUserDto.password,
        parseInt(process.env.SALT_OR_ROUNDS)
      ),
    });

    return await createduser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const item = await this.userModel.findByIdAndUpdate(id, {
      username: updateUserDto.username,
    });
    if (!item) throw new RpcException('Not Found');
    return item;
  }

  async remove(id: string) {
    const item = await this.userModel.findByIdAndRemove(id);
    if (!item) throw new RpcException('Not Found');
    return item;
  }
}
