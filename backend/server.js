import express from 'express';
import {config} from 'dotenv';
import auth_route from './Routes/auth.route.js';
import ConnectToMongoDB from './DB/connectToMongoDB.js';
import messages_route from './Routes/messages.route.js';
config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/auth',auth_route);
app.use('/api/messages',messages_route);

app.get('/',(req,res)=>{
    res.send('hi from server !');
});

app.listen(PORT,()=>{
    ConnectToMongoDB();
    console.log(`server is runnig on ${PORT}`);
})