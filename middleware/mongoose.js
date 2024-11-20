import mongoose from "mongoose";
import User from "../models/User"
import Team from "../models/Team"
import Project from "../models/Project"

const connectDb = handler => async (req,res)=>{

    try {
        if(mongoose.connections[0].readyState){
            return handler(req,res)
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connectedtoDb");
        return handler(req,res);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "An error occurred while connecting to the database" });
    }
    
}

export default connectDb;