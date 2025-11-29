import { Request, Response, NextFunction } from "express";
import { CONSTANT } from "../constant/constant";
import { verifyToken } from "../utils/fn/jwt-config";
import { JwtUserPayload } from "../utils/fn/type/interface";

export const adminRoleMiddleware = (
  req: Request & { user?: JwtUserPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    if (decoded.role !== CONSTANT.USER_TYPE.ADMIN) {
      return res.status(403).json({
        message: "Forbidden: Admin role required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authorization failed",
      error,
    });
  }
};

export const userRoleMiddleWare=(
    req:Request & {user?:JwtUserPayload},
    res:Response,
    next:NextFunction
)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"token is missing"});
        }
        const decoded=verifyToken(token);
        req.user=decoded;
        if(decoded.role!=CONSTANT.USER_TYPE.USER){
            return res.status(403).json({message:"Forbidden:User role requried"})
        }

    }catch(error){
        return res.status(500).json({
      message: "Authorization failed",
      error,
    });

    }
}
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }

      const decoded: any = verifyToken(token);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", error });
    }
  };
};