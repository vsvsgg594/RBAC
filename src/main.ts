import express from "express";
import dotenv from "dotenv";
import sequelize from "./database/database-config";
import cors from "cors";
import { createServer } from "http";
import {adminRoleMiddleware} from "./middleware/auth-middleware";
import router from "./routes";
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server=createServer(app);

app.use(cors());
app.use("/test-server",(req,res)=>{
   res.status(200).json({ message: "Server is running" });
})
app.use(router);
app.use("/profile",adminRoleMiddleware,(req,res)=>{
    res.json({message:"Your profile"})
})
async function initializeApplication(){
    try{
        const PORT=process.env.PORT;
        try{
            const connetion = await sequelize.sync();
            if(connetion){
                console.log("database connection establish successfully")
            }

        }catch(error:any){
            console.log("error", error)

        }
        server.listen(PORT,()=>{
            console.log(`server is running at port ${PORT}`)
        })
        

    }catch(error:any){
        console.log("failed to start server",error);

    }
}

initializeApplication();







