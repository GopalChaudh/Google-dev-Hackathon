import {Router} from 'express';
import authCheck from '../middleWare/authCheck.middleware.js';
import { AddComment, CreatePost, LikePost, RemoveComment, RemoveLike, RemovePost, SharePost } from '../Controllers/posts.controller.js';


const posts_route = Router();

posts_route.post('/createPost',authCheck,CreatePost);
posts_route.post('/addcomment',authCheck,AddComment);
posts_route.post('/likePost',authCheck,LikePost);
posts_route.post('/sharePost',authCheck,SharePost);
posts_route.delete('/removeComment',authCheck,RemoveComment);
posts_route.delete('/removePost',authCheck,RemovePost);
posts_route.delete('/removeLike',authCheck,RemoveLike); 

export default posts_route;