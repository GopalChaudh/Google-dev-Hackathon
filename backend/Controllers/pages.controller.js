import pagemodel from "../Models/page.model.js";

export const CreatePage = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const authorId = req.userId;
        console.log(authorId);
        
        const newPage = new pagemodel({
            authorId,
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
        // Do not send response here, just let the error propagate to the error handling middleware
        next(err); // Pass the error to the error handling middleware
    }
};

export const UpdatePage = (req, res) => {
    res.send('Update works');
};
