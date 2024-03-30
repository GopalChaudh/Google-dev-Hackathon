import jwt from 'jsonwebtoken';
import UserModel from '../Models/user.model.js';

const authCheck = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(400).send({
            message: 'Authentication failed! No JWT token found!',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secrate);
        console.log(decoded.userId);

        const userId = decoded.userId;
        const checkUser = await UserModel.findById(userId);

        if (!checkUser) {
            return res.status(404).send({
                message: 'User not found!',
            });
        }

        req.userId = decoded.userId;
        next(); // Move to the next middleware
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error while verification");
    }
};

export default authCheck;
