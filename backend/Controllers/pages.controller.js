import pagemodel from "../Models/page.model.js";

export const CreatePage = async (req, res,next) => {
//     {
//         "title":"test page",
//      "avatar":"https://randomwordgenerator.com/img/picture-generator/54e1d0434b54a814f1dc8460962e33791c3ad6e04e50744076297cd49048c0_640.jpg",
//       "description":"test page"
//  }
    try {
        const { title, description,avatar } = req.body;
        const authorId = req.userId;
        // console.log(authorId);
        
        const newPage = new pagemodel({
            authorId,
            avatar,
            title,
            description
        });
        const page = await newPage.save();
        console.log(page);
        res.status(200).send({
            message: 'Page created'
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass the error to the error handling middleware
    }
};

export const UpdatePage = async(req, res,next) => {
//     {
//         "id":"6607d481672d49db2677d9be",
//    "title":"update ho gaya balle page",
//     "avatar":"https://randomwordgenerator.com/img/picture-generator/54e1d0434b54a814f1dc8460962e33791c3ad6e04e50744076297cd49048c0_640.jpg",
//  "description":"test page"
// }
    try {
        const {id, title, description,avatar } = req.body;
        const updatedPage = await pagemodel.findByIdAndUpdate(id,{
            title, 
            description,
            avatar
        },{new:true});
        if(!updatedPage){
            return res.status(404).send({
                message:'page not found! '
            })
        }
        // console.log(updatedPage);
        res.status(200).send({
            message: 'Page updated'
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass the error to the error handling middleware
    }
};

export const Addfollowers = async (req, res, next) => {
    // {
    //     "id":"6607d481672d49db2677d9be",
    //        "newFollower":"6607c427448ec5e467d4574e"
    //    }

    try {
        const { id, newFollower } = req.body;

        // Check if the new follower is already present in the followers array
        const page = await pagemodel.findById(id);
        if (!page) {
            return res.status(404).send({
                message: 'Page not found!'
            });
        }
        
        if (page.followers.includes(newFollower)) {
            return res.status(400).send({
                message: 'Follower already exists in the page!'
            });
        }

        // Add the new follower
        const updatedPage = await pagemodel.findByIdAndUpdate(id, {
            $push: { followers: newFollower }
        }, { new: true });

        if (!updatedPage) {
            return res.status(404).send({
                message: 'Page not found!'
            });
        }

        res.status(200).send({
            message: 'Follower added to the page successfully',
            updatedPage: updatedPage
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass the error to the error handling middleware
    }
};

