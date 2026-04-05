import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsMongoId } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) { 
  @IsMongoId()
  id: string;
}
