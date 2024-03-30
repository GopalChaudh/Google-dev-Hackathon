import express from 'express';
import {config} from 'dotenv';
import auth_route from './Routes/auth.route.js';
import ConnectToMongoDB from './DB/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import pages_route from './Routes/pages.route.js';
import posts_route from './Routes/posts.route.js';
import user_route from './Routes/user.route.js';
// import messages_route from './Routes/messages.route.js';
config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/api/auth',auth_route);
app.use('/api/page',pages_route);
app.use('/api/post',posts_route);
app.use('/api/add',user_route);

app.get('/',(req,res)=>{
    res.send('hi from server !');
});

app.listen(PORT,()=>{
    ConnectToMongoDB();
    console.log(`server is runnig on ${PORT}`);
})