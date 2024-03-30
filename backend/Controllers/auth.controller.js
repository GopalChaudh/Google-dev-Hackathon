import userModel from "../Models/user.model.js";
import bcrypt from 'bcrypt'
import genratetoken from "../utils/genrateToken.js";

export const signup = async (req, res) => {
    const { fullName, userName, password, conformPass, gender } = req.body;
    console.log(req.body);
    try {
        if (password != conformPass) {
            return res.status(400).send({
                message: "Password mismatch"
            })
        }

        const user = await userModel.findOne({ userName });
        if (user) {
            return res.status(400).send({
                message: 'User already exists with the username'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const avatarUrl = gender === 'female' ?
            `https://avatar.iran.liara.run/public/girl?userName=${userName}` :
            `https://avatar.iran.liara.run/public/boy?userName=${userName}`;

        const newUser = await userModel.create({
            fullName,
            userName,
            password: hashPass,
            gender,
            profilePic: avatarUrl
        });

        const data = genratetoken(newUser._id, res);

        res.status(201).send(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error in signup controller',
            user: data
        });
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userModel.findOne({ userName });

        if (!user) {
            return res.status(400).send({
                message: "Username or password is incorrect"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: "Username or password is incorrect"
            });
        }

        const token = genratetoken(user._id, res);
        console.log(token);

        res.status(200).send({
            message: "Login successful",
            user: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error in login controller'
        });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).send({
            message: 'Logout successful'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error in logout controller'
        });
    }
}
