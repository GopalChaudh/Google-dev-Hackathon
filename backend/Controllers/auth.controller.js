import userModel from "../Models/user.model.js";
import bcrypt from 'bcrypt'
import genratetoken from "../utils/genrateToken.js";
export  const signup = async(req,res)=>{
    const {fullName,userName,password,conformPass,gender} = req.body;
    try{ 

        if(password != conformPass){
            res.status(400).send({
                message:"password Missmatch"
            })
        }
        const user  = await userModel.findOne({userName});
        if(user){
            return res.status(400).send({
                message:'user already exists with the username ! '
            })
        }
        // hash password 
        const salt = await bcrypt.genSalt(10); // genrate salt
        const hashPass = await bcrypt.hash(password,salt); // add salt to password
        const boy = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const girl = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const newUser = await userModel.create({
            fullName,
            userName,
            password:hashPass,
            gender,
            profilePic: (gender === 'female' ? girl : boy)
        })
        await newUser.save();
        genratetoken(newUser._id,res);
    
        res.send({...newUser})
    }catch(err){
        console.log(err);
        res.send({
            message:'error in signup controller'
        })
    }
}
export const login = async(req,res)=>{
   try{
     const {userName,password} = req.body;
    const checkuser =await userModel.findOne({
        userName
    });

    const isPaswordCorrect = await bcrypt.compare(password,checkuser?.password || "");

    if(!isPaswordCorrect){
        return res.status(400).send({
            message:"userName or password is incorrect"
        })
    }
    genratetoken(checkuser._id,res);
    res.status(200).send({
        message:"login successfull",
    })
    }catch(err){
        console.log(err);
        res.send({
            message:'error in signup controller'
        })
    }
}
export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).send({
            message:'logout successFully'
        })
}catch(err){
    console.log(err);
    res.send({
        message:'error in logout controller'
    })
}
}