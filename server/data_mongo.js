import connection from "./source/db/connection.js";
import Data from "./source/models/dataSchema.js";
import { readFile } from 'fs/promises';
import dotenv from "dotenv"
dotenv.config();

const jsonData = await readFile('./dataset.json', 'utf-8');

const data = JSON.parse(jsonData);
connection();

const start=async () =>{
    const resp=await Data.create(data).then(()=>
    {
        console.log("success");
    }).catch((err)=>{
        console.log(err);
    })
}


start();