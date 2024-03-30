import mongoose from 'mongoose';
const pageSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },{timestamps:true});
  
  // createdAt: { type: Date, default: Date.now },

const pagemodel = mongoose.model('Pages',pageSchema);
export default pagemodel;