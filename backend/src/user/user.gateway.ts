import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Get, Param, Post, Body, Patch, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { Response  } from 'express';

@Controller('/v1/auth/')
export class UserGateway {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, token } = await this.userService.login(loginUserDto);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { user };
  }

  @UseGuards(AuthGuard)
  @Get('/check')
  checkAuth(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in prod
    });

    return { message: 'Logged out successfully' };
  }
}
