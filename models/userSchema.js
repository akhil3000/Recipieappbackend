const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    savedRecipies:[{type:mongoose.Schema.Types.ObjectId,ref:"recipies"}]

    
})
const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;