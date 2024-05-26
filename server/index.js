import express from 'express';
//import mongoose, { connection } from 'mongoose';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import  Routes from './routes/route.js';

const app = express();

app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
mongoose.set("strictQuery", false);

const router = express.Router();



app.use('/',Routes);


const Connection = async () => {
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/eassets", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    }
    catch(error){
        console.log("Error while connecting with database",error);
    }
}

Connection();
const PORT =8000;
app.listen(PORT,()=>console.log("Server is running sucussfully on port "+PORT));