import jwt from 'jsonwebtoken'

import UserModel from '../Models/user.model.js'
const authCheck = (req,res,next)=>{

    const token= req.cookies.jwt;
        if(!jwt){
            return res.status(400).send({
                message:'auth faild ! no jwt token found! '
            })
        }
        try{

            
            jwt.verify(token, process.env.jwt_secrate, function(err, decoded) {
                if(err){
                    res.status(500).send({
                        message:'error during exicuting jwt verify'
                    })
                }
                console.log(decoded.userId) 
                const userId = decoded.userId;
                const checkUser = UserModel.findById(userId);
                if(!checkUser){
                    return res.status(404).send({
                        message:'user not found! ',
                    })
                }
                req.userId = decoded.userId;
                next() // to the next middle ware 
            });
            
        }catch(err){
            console.log(err);
            res.status(500).send("error while verification");
        }
        
    //  console.log(req.cookies);
    next();
}

export default authCheck;