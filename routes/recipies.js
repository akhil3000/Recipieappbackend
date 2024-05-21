const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const RecipieModel=require("../models/recipieSchema");
const UserModel=require("../models/userSchema");
const getVerifyToken=require("./users");
const verifyToken=getVerifyToken.verifyToken;

router.get("/getrecipie",async(req,res)=>{
    try{
       const response=await RecipieModel.find({});
       res.send(response);

    }catch(err){

        res.send(err);
    }

})

router.post("/createrecipie",verifyToken,async(req,res)=>{
    try{
       const record=req.body; 
       const response=await RecipieModel.create(record);
       res.send(response);

    }catch(err){

        res.send(err);
    }

})


router.put("/saverecipie",verifyToken,async(req,res)=>{

    
    try{
        const recipie=await RecipieModel.findById(req.body.recipieID);
        const user=await UserModel.findById(req.body.userID);
        user.savedRecipies.push(recipie);
        await user.save();
        res.send({savedRecipies:user.savedRecipies});

    
    

    }catch(err){

        res.send(err);
    }

})





router.get("/savedRecipies/ids/:userID",async(req,res)=>{

    
    try{
        
      const user=await UserModel.findById(req.params.userID);
      res.send({savedRecipies:user?.savedRecipies});
    

    }catch(err){

        res.send(err);
    }

})


router.get("/savedRecipies/:userID",verifyToken,async(req,res)=>{

    
    try{
        
      const user=await UserModel.findById(req.params.userID);
      const savedRecipies=await RecipieModel.find({
        _id:{$in:user.savedRecipies},

      });

      res.send({savedRecipies});
    

    }catch(err){

        res.send(err);
    }

})





module.exports=router;