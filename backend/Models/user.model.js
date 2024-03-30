import {Schema,model} from "mongoose";

const userSchema = new Schema({
        fullName:{
            type:String,
            require:true
        },
        userName:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        gender:{
            type:String,
            require:true
        },
        profilePic:{
            type:String,
            require:false
        },
        verified: { type: Boolean, default: false },
  badges: [{ type: String }],
},{timestamps:true})

const userModel =  model('User',userSchema);
export default userModel;