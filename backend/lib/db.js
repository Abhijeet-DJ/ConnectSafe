import mongoose from "mongoose";

export async function connectToDB(URI){
    await mongoose.connect(URI)
    .then(()=>{console.log("MongoDb connected successfuly");})
    .catch((err)=>console.log(`Error :: DB Connection Failed :: ${err}`))
}