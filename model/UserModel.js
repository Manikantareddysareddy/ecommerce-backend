const mongoose=require("mongoose");

const userSchemaRules={
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
}
const userSchema=new mongoose.Schema(userSchemaRules);

const UserModel=mongoose.model("user_management",userSchema);

module.exports=UserModel;