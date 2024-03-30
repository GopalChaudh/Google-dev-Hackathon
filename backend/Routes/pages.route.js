import {Router} from 'express';
import { Addfollowers, CreatePage, RemoveFollower, UpdatePage } from '../Controllers/pages.controller.js';
import authCheck from '../middleWare/authCheck.middleware.js';


const pages_route = Router();

pages_route.post('/createPage',authCheck,CreatePage);
pages_route.put('/updatePage',authCheck,UpdatePage);
pages_route.post('/addFollower',authCheck,Addfollowers);
pages_route.delete('/removeFollower',authCheck,RemoveFollower);

export default pages_route;