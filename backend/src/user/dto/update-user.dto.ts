import { PartialType ,OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['pass', 'email'] as const)) {
    @IsString()
    _id : string

    @IsString()
    fieldName : string

    @IsString()
    value : string
}