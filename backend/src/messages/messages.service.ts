import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<any>,
    @InjectModel('User') private userModel: Model<any>,
  ) { }

  async getUsersForSidebar(userId: string) {
    return this.userModel.find({ _id: { $ne: userId } }).select('-pass');
  }

  async getMessages(currUserId: string, userToChatId: string) {
    const myMessages = await this.messageModel.find({
      $or: [
        { senderId: currUserId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: currUserId },
      ],
    }).exec();

    // console.log(myMessages);
    
    return myMessages
  }

  async sendMessage(data: {
    senderId: string;
    recieverId: string;
    text: string;
    image?: string;
  }) {
    const newMessage = new this.messageModel(data);
    await newMessage.save()
    return newMessage;
  }
}