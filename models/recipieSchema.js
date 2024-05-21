const mongoose=require("mongoose");

const RecipieSchema=new mongoose.Schema({
    name:String,
    ingredients:[String],
    instructions:String,
    imageUrl:String,
    cookingTime:Number,
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }



});

const RecipieModel=mongoose.model("recipies",RecipieSchema);
module.exports=RecipieModel;