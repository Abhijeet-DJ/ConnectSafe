import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MessageDocument = HydratedDocument<Message> 

@Schema({
    timestamps : true
})
export class Message {
    @Prop({
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    })
    senderId : string

    @Prop({
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    })
    receiverId : string

    @Prop({
        required : true,
    })
    text : string
}

export const MessageSchema = SchemaFactory.createForClass(Message)
