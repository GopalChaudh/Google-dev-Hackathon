import {Router} from 'express';
import { CreatePage } from '../Controllers/pages.controller.js';
import authCheck from '../middleWare/authCheck.middleware.js';


const pages_route = Router();

pages_route.post('/createPage',authCheck,CreatePage);


export default pages_route;