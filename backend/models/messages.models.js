import mongoose, { Schema , model, mongo } from "mongoose";

const messageSchema = new Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    text : {
        type : String,
    },
    image : {
        type : String,
    },
},
{timestamps : true});

export default model('Message',messageSchema);