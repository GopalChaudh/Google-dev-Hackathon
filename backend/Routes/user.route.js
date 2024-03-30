import {Router} from 'express';
import authCheck from '../middleWare/authCheck.middleware.js';
import { addTosaved, followUser, removeFromSaved, unfollowUser } from '../Controllers/user.controller.js';


const user_route = Router();
user_route.post('/saved',authCheck,addTosaved);
user_route.post('/followuser',authCheck,followUser);
user_route.delete('/removeSaved',authCheck,removeFromSaved);
user_route.delete('/unfollowuser',authCheck,unfollowUser);


export default user_route;