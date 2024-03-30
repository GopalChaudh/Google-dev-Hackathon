import userModel from "../Models/user.model.js";

export const addTosaved = async (req, res, next) => {
    try {
        // {
        //     "postId":"6607f55b604dec137b5149b0"
        // }
        const { postId } = req.body;
        const userId = req.userId;

        await userModel.findByIdAndUpdate(userId, {
            $addToSet: { saved: postId }
        });

        res.status(200).send({
            message: 'Post added to saved successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};

export const removeFromSaved = async (req, res, next) => {
    try {
        // {
        //     "postId":"6607f55b604dec137b5149b0"
        // }
        const { postId } = req.body;
        const userId = req.userId;

        const user = await userModel.findByIdAndUpdate(userId, {
            $pull: { saved: postId }
        }, { new: true });

        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        res.status(200).send({
            message: 'Post removed from saved successfully',
            updatedUser: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};


// export const followUser = async (req, res, next) => {
//     try {
//         const { userIdToFollow } = req.body;
//         const userId = req.userId;

//         const userToFollow = await userModel.findById(userIdToFollow);
//         if (!userToFollow) {
//             return res.status(404).send({
//                 message: 'User not found'
//             });
//         }

       
//         await userModel.findByIdAndUpdate(userId, {
//             $addToSet: { following: userIdToFollow }
//         });

//         await userModel.findByIdAndUpdate(userIdToFollow, {
//             $addToSet: { follower: userId }
//         });

//         res.status(200).send({
//             message: 'User followed successfully'
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             error: err.message
//         });
//     }
// };


export const followUser = async (req, res, next) => {
    try {
        const { userIdToFollow } = req.body;
        const userId = req.userId;

        // Check if the user to follow exists
        const userToFollow = await userModel.findById(userIdToFollow);
        if (!userToFollow) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        // Update the logged-in user's following list
        await userModel.findByIdAndUpdate(userId, {
            $addToSet: { following: userIdToFollow }
        });

        // Update the user being followed's follower list
        await userModel.findByIdAndUpdate(userIdToFollow, {
            $addToSet: { followers: userId }
        });

        res.status(200).send({
            message: 'User followed successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};

export const unfollowUser = async (req, res, next) => {
    try {
        const { userIdToUnfollow } = req.body;
        const userId = req.userId;

        // Update the logged-in user's following list
        await userModel.findByIdAndUpdate(userId, {
            $pull: { following: userIdToUnfollow }
        });

        // Update the user being unfollowed's follower list
        await userModel.findByIdAndUpdate(userIdToUnfollow, {
            $pull: { followers: userId }
        });

        res.status(200).send({
            message: 'User unfollowed successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
};