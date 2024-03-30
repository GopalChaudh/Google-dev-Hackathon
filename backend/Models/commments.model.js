import mongoose from "mongoose";

const Comments = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },

},{timestamps:true});

const CommentModel  =  mongoose.model('Comment', Comments);
export default CommentModel;
