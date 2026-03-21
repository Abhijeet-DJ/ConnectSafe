import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Get, Param, Post ,Body } from '@nestjs/common';

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
  findOne(@Param() id: number) {
    return this.userService.findOne(id);
  }


  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }


  remove(@Param() id: number) {
    return this.userService.remove(id);
  }
}
