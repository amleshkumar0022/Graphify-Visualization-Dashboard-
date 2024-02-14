import cors from "cors";
import express from "express";
import dotenv from "dotenv"
import connection from "./source/db/connection.js";
import clientrouter from './source/models/rote.js'
dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
connection();
app.use('/users',clientrouter)
// app.get('/user',(req,res)=>{
//     res.send("helooooo");
// })
app.listen(process.env.PORT,()=>{
    console.log(`working on port number ${process.env.PORT}`);
})

