import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Get, Param, Post ,Body, Patch, Delete } from '@nestjs/common';

@Controller('/v1')
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      const errObj = {
        probableConflict : "Id is not good or Uuser type not satisfied",
        error : { ...error }
      }
      return errObj
    }
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto ) {
    return this.userService.update(updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
