import mongoose from 'mongoose';
const pageSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    avatar:{type:String,required:false},
    description: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
},{timestamps:true});

const pagemodel = mongoose.model('Pages',pageSchema);
export default pagemodel;