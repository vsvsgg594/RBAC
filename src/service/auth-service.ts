import User from "../models/user-model";
import bycrpt  from "bcrypt";
import { generateAccessToken,generateRefreshToken } from "../utils/fn/jwt-config";
import {UserPayload ,LoginPayload} from "../models/user-model";
import {generateuuId} from "../utils/fn/generate-uuid";
export class AuthService{
    static async registerUser(paylaod:UserPayload){
        try{
            const{name,email,password,role}=paylaod;
            if(!name||!email||!password){
                throw new Error("Name ,Email,and password are requried");
            }
            const exitsUser=await User.findOne({where:{email}});
            if(exitsUser){
                throw new Error("users exits. please use another email")
            }
            const hashedPassword = await bycrpt.hash(password, 10);
            const user=await User.create({
                userId:generateuuId(),
                name,
                email,
                password:hashedPassword,
                role: role || "USER",

            })
            return {
             message: "User registered successfully",
             user,
          };

        }catch(error){
            throw new Error("failed to register user"+error)

        }
    }
    static async loginUser(paylaod:LoginPayload){
        try{
            const{email,password}=paylaod;
            if(!email||!password){
                throw new Error("email and password requried");
            }
            const user=await User.findOne({where:{email}});
            if(!user){
                throw new Error("User not found");
            }
            const isMatchPassword=await user.validaPassword(password);
            if(!isMatchPassword){
                throw new Error("password does not match");
            }
             const accessToken=generateAccessToken({
                userId:user.userId,
                role:user.role,
                email:user.email
            });
            const refreshToken=generateRefreshToken({
                userId:user.userId,
                role:user.role,
                email:user.email
            })
            return {
            message: "Login successful",
            user,
            accessToken,
            refreshToken,
           };


        }catch(error){
            console.log("errr",error);
            throw error;

        }
    }
}
