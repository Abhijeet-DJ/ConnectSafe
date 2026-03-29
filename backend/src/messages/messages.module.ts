import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Message, MessageSchema } from './schema/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name : Message.name,
      schema : MessageSchema
    },
    {
      name : User.name,
      schema : UserSchema
    }]),
    AuthModule
  ],
  controllers : [MessagesController],
  providers: [MessagesGateway, MessagesService , AuthGuard]
})
export class MessagesModule {}
