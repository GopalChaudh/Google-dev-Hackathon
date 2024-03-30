import mongoose from "mongoose";

export default async function ConnectToMongoDB(){
    try{
        await mongoose.connect(process.env.DB);
        console.log("connected to database! ");
    }catch(err){
        console.log(err);
    }
}