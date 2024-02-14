import express from 'express'
const router=express.Router();
import Data from './dataSchema.js';
import connection from '../db/connection.js';
import dotenv from "dotenv"
dotenv.config();
connection();

async function  fill(obj,var1){
    let matchingData = []; 
    let keys = Object.keys(obj); 

    try {
        let data = await Data.find();

        for (let item of data) {
            let flag = true;
            for (let i = 1; i < keys.length; i++) {
                if (item[keys[i]] != obj[keys[i]]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                matchingData.push(item); 
            }
        }
    } catch (err) {
        console.log("Error:", err);
    }

    console.log(matchingData);
    console.log(matchingData.length)
    // console.log(var1);
    let Counts = {};
    matchingData.forEach(item => {
        const var2 = item[var1];
        Counts[var2] = (Counts[var2] || 0) + 1;
      });
   
      return Counts;
}

router.post('/api/details',async (req,res)=>{
    const var1=`${req.body.var1}`;
    let var3=await fill(req.body,var1);
    //console.log(var3);
    if(var3)
    {
        res.json(var3);
    }
    else
    {
        return res.status(422).json({Message:"not found"});
    }

})

export default router