import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { HashService } from 'src/common/hash.service';
import { AuthService } from 'src/auth/auth.service';


type SafeUser = {
  _id: any;
  email: string;
  fullName: string;
  profileImg?: string;
};

class UUser {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly email: string;
  readonly profileImg: string;
  readonly fullName: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly hashService: HashService,
    private readonly authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    if (await this.userModel.findOne({ email: createUserDto.email }).lean().exec()) {
      throw new BadRequestException({ message: 'User already exists!' })
    }

    createUserDto.pass = await this.hashService.hashPass(createUserDto.pass)
    const newUser = new this.userModel(createUserDto)
    return await newUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: SafeUser, token: string }> {
    const { email, pass } = loginUserDto

    const user = await this.userModel.findOne({ email }).lean().exec();

    if (user && await this.hashService.comparePass(pass, user.pass)) {
      const { pass, ...result } = user;

      const token = await this.authService.generateToken({
        id: result._id,
        email: result.email,
      });

      return {
        user: result,
        token,
      };
    }

    throw new BadRequestException({ message: "No user forund check your creds!" })
  }

  async findAll(): Promise<UserDocument[]> {
    const allUsers: UserDocument[] = await this.userModel.find().select("-pass").lean().exec()
    return allUsers;
  }

  async findOne(id: string): Promise<UUser | any> {
    try {
      const user: UUser | any = await this.userModel.findById(id).select("-pass").lean().exec() as UUser | any
    return user
    } catch (error) {
      console.log(error);
    
      return error.message
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    const updateFieldName = updateUserDto.fieldName;
    const updateValue = updateUserDto.value
    const reqUser = await this.userModel.findByIdAndUpdate(updateUserDto._id, {
      [updateFieldName]: updateValue
    }, {
      upsert: true,
      runValidators: true,
      returnDocument: 'after',
    }).select('-pass -email').exec();
    return reqUser;
  }

  async remove(id: string): Promise<UserDocument | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      return deletedUser
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException('Delete operation failed');
    }
  }
}
