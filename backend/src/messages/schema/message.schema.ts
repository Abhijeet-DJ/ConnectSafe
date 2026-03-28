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
    recieverId : string

    @Prop({
        required : true,
    })
    content : string
}

export const MessageSchema = SchemaFactory.createForClass(Message)
