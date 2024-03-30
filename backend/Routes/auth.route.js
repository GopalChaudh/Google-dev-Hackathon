import {Router} from 'express';
import { login, logout, signup } from '../Controllers/auth.controller.js';


const auth_route = Router();

auth_route.post('/login',login);
auth_route.post('/signup',signup);
auth_route.post('/logout',logout);

export default auth_route;