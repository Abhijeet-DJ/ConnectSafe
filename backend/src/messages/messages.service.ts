import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel : Model<MessageDocument>
  ){}

  async create(createMessageDto: CreateMessageDto) : Promise<string> {
    
    const newMessage : MessageDocument = new this.messageModel(createMessageDto)
    await newMessage.save()
    return `Message sent : ${newMessage}`;
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: string) {
    return `This action returns a #${id} message`;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
