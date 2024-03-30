import pagemodel from "../Models/page.model.js";

export const CreatePage = async (req, res,next) => {
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
        // res.setHeader({'content-Type':'application/json'});
        res.status(200).send({
            message: 'Page created'
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass the error to the error handling middleware
    }
};

export const UpdatePage = async(req, res,next) => {
    try {
        const {id, title, description,avatar } = req.body;
        const authorId = req.userId;
        // console.log(authorId);
        
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
        // const page = await newPage.save();
        console.log(updatedPage);
        res.status(200).send({
            message: 'Page updated'
        });
    } catch (err) {
        console.log(err);
        next(err); // Pass the error to the error handling middleware
    }
};
