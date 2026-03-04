import { Schema , model } from 'mongoose'

const userSchema = new Schema({
    fullName : { 
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    pass : {
        type : String,
        required : true,
        minLength : 8
    },
    profileImg : {
        type : String,
        default : ""
    }
},
{
    timestamps:true
})

const User = model("User", userSchema);

export default User