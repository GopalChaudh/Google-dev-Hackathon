import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image:{type:String,required:false},
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    shares: { type: Number, default: 0 },
  },{timestamps:true});
  

const postModel = mongoose.model('Post',postSchema);

export default postModel;