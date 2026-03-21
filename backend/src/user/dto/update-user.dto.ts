import { PartialType ,OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['pass', 'email'] as const)) {
    @IsNumber()
    id : number
}