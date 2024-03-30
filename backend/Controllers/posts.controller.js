import CommentModel from "../Models/commments.model.js";
import PostModel from "../Models/Postmodel.js";

export const CreatePost  = async(req,res,next)=>{
    // {
    //     "image":"base64:banajsslk.sjskosk",
    //     "content":"hi ji"
    // }
    try {
        const {
        image,
        content
    } = req.body;
        const author = req.userId;
        // console.log(authorId);
        
        const newPage = new PostModel({
            author,
            image, 
            content
        });
        const post = await newPage.save();
        res.status(200).send({
            message: 'post created',
            data:post
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            err
        }); // Pass the error to the error handling middleware
    }
}

export const RemovePost = async (req, res, next) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).send({
                message: 'Post ID is required'
            });
        }

        // Find the post by its ID and remove it
        const deletedPost = await PostModel.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }

        res.status(200).send({
            message: 'Post deleted successfully',
            deletedPost: deletedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};


export const AddComment = async (req, res, next) => {
    //{
//   "userId": "6607dfda96b5b81845a2748f",
//   "postId": "6607f57c604dec137b5149b3",
//   "content": "hi bhai nice post"
// }
    try {
        const { userId, postId, content } = req.body;

        const newComment = new CommentModel({
            user: userId,
            post: postId,
            content: content
        });
        
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }
        const comment = await newComment.save();

        post.comments.push(comment._id);
        const updatedPost = await post.save();
        if(!updatedPost){
            return res.status(500).send({
                message: 'error in updatePost',
            });
        }
        res.status(200).send({
            message: 'Comment added successfully',
            comment: comment
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};

export const RemoveComment = async (req, res, next) => {
    try {
        // {
        //     "postId": "6607f57c604dec137b5149b3",
        //        "commentId":"6607f9a9fee47fd4d04f7ffb"
          
        //  }
        const { postId, commentId } = req.body;

        // Find the post
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }

        // Find and remove the comment
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).send({
                message: 'Comment not found'
            });
        }

        await post.comments.pull(commentId);
        const updatedPost = await post.save();

        res.status(200).send({
            message: 'Comment removed from the post successfully',
            updatedPost: updatedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};
export const LikePost = async (req, res, next) => {
    // {
    //     "postId":"6607f57c604dec137b5149b3"
    // }
    try {
        const { postId } = req.body;

        const post = await PostModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });

        if (!post) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }

        res.status(200).send({
            message: 'Post liked successfully',
            updatedPost: post
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};
export const RemoveLike = async (req, res, next) => {
    // {
    //     "postId":"6607f57c604dec137b5149b3"
    // }
    try {
        const { postId } = req.body;

        const post = await PostModel.findByIdAndUpdate(postId, { $inc: { likes: -1 } }, { new: true });

        if (!post) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }

        res.status(200).send({
            message: 'tremoved like from Post successfully',
            updatedPost: post
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};

export const SharePost = async (req, res, next) => {
    // {

    //     "postId":"6607f57c604dec137b5149b3"
    // }
    try {
        
        const { postId } = req.body;

        const post = await PostModel.findByIdAndUpdate(postId, { $inc: { shares: 1 } }, { new: true });

        if (!post) {
            return res.status(404).send({
                message: 'Post not found'
            });
        }

        res.status(200).send({
            message: 'Post shared successfully',
            updatedPost: post
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};