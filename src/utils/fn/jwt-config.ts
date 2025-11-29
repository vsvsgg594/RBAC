import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {JwtUserPayload} from "./type/interface"

dotenv.config();

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken=(paylaod:object)=>{

    return jwt.sign(paylaod,ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
}

export const generateRefreshToken=(paylaod:object)=>{
    return  jwt.sign(paylaod,REFRESH_TOKEN_SECRET,{expiresIn:"5d"});
}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,ACCESS_TOKEN_SECRET) as JwtUserPayload;

}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtUserPayload;
};