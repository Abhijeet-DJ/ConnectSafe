import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';

class UUser {
  readonly _id : mongoose.Schema.Types.ObjectId;
  readonly email : string;
  readonly profileImg : string;
  readonly fullName : string;
}

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
    const allUsers : UserDocument[] = await this.userModel.find().select("-pass").lean().exec()
    return allUsers;
  }

  async findOne(id: string) : Promise<UUser | any> {
    const user : UUser | any =  await this.userModel.findById(id).select("-pass").lean().exec() as UUser | any
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const updateFieldName = updateUserDto.fieldName;
    const updateValue = updateUserDto.value
    const reqUser = await this.userModel.findByIdAndUpdate(updateUserDto._id,{
      [updateFieldName] : updateValue
    },{
      upsert : true,
      runValidators : true,
      returnDocument : 'after',
    }).select('-pass -email').exec();
    return reqUser;
  }

  async remove(id: string) : Promise<UserDocument | null > {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      return deletedUser
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new InternalServerErrorException('Delete operation failed');
    }
  }
}
