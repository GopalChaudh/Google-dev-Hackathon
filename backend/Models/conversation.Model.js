import mongoose from 'mongoose';


const convoSchema = new mongoose.Schema({
    participents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Messages',
        default:[]
    }]

},{timestamps:true});

const conversationMode = mongoose.model("Conversation",convoSchema);
export default conversationMode