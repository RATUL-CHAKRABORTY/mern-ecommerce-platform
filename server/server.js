// ratulc180_db_user
// svkzUh7TRljoMzxj
// mongodb+srv://ratulc180_db_user:svkzUh7TRljoMzxj@cluster0.aqjo5x4.mongodb.net/



//create a express server by creating a app

import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRouter from './routes/auth/auth-routes.js'
//create a database connection -> u can also 
//create a serparte file for this and them import/use that file
import adminProductRouter from './routes/admin/products-routes.js';

mongoose.connect('mongodb+srv://ratulc180_db_user:svkzUh7TRljoMzxj@cluster0.aqjo5x4.mongodb.net/')
.then(()=> console.log("MongoDB connected"))
.catch((error)=>{
    console.log(error);
})

const app=express();
const PORT= process.env.PORT|| 5000;

//config
app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            'content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use("/api/admin/products",adminProductRouter);
app.listen(PORT , ()=> console.log(`Server is now running on port ${PORT}`));