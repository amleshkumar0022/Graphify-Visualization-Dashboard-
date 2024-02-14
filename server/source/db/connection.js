import mongoose from "mongoose";


const connection= async () => {
    const conn= await mongoose.connect(`${process.env.URL}`);
    if(conn)
    {
        console.log("connected");
    }
    else{
        console.log("error in connection to database");
    }
}

export default connection;