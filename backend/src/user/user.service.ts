import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel : Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto) : Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto)
    return await newUser.save();
  }

  async findAll() : Promise<UserDocument[]> {
    const allUsers : UserDocument[] = await this.userModel.find().lean().exec()
    return allUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
