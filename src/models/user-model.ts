import sequelize from "../database/database-config";
import {DataTypes,InferAttributes, InferCreationAttributes,Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model< InferAttributes<User>,
  InferCreationAttributes<User>>{
    declare userId:string;
    declare name:string;
    declare email:string;
    declare password:string;
    declare role:string;
    async validaPassword(password:string){
    return bcrypt.compare(password,this.password);
   }

  }
  


User.init(
    {
        userId:{
            type:DataTypes.STRING,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        role:{
            type:DataTypes.ENUM("ADMIN","USER"),
            defaultValue:"USER"
        }

    },
    {
      sequelize,
      tableName: "Users",
      timestamps: true,
    }
)  
export default User;

export interface UserPayload{
    userId:string;
    name:string;
    email:string;
    password:string;
    role?:string

}
export interface LoginPayload{
    email:string;
    password:string;
}