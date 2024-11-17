import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";


const app = express();
// app.use(bodyParser.json()); 
app.use(cors());
dotenv.config();

// Set up routes before connecting to the database
app.use(express.json());
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("DB connected successfully");
    
}).catch((error) => {
    console.error("Database connection failed:", error);
});

app.use("/api", route);
app.get('/',(req,res)=>{
    res.send({message:"this is running"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
