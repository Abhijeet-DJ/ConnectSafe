import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps : true,
})
export class User {
    @Prop({
        required : true
    })
    fullName : string

    @Prop({
        required : true,
        unique : true,
        // index : true  // Check here it could be swapped as an index in place of id
    })
    email : string

    @Prop({
        required : true,
    })
    pass : string

    @Prop({
        default : ""
    })
    profileImg : string
}

export const UserSchema = SchemaFactory.createForClass(User)