import {Request,Response} from "express";
import { AuthService } from "../service/auth-service";

export class AuthController{
    static async registerController(req:Request,res:Response){
        try{
            const user=await AuthService.registerUser(req.body);
            return res.status(201).json({message:"User Register successfully",user});

        }catch(error){
            return res.status(401).json({message:"Failed to Register user",error})

        }

    }
    static async loginController(req:Request,res:Response){
        try{
            const user=await AuthService.loginUser(req.body);
            return res.status(200).json({message:"User login successfully",user});

        }catch(error){
            console.log("error",error);
            return res.status(401).json({message:"failed to login user",error})

        }
    }
}