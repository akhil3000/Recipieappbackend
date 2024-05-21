const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const router=express.Router();
const UserModel=require("../models/userSchema");
router.post("/register",async(req,res)=>{
     const record=req.body;//Getting registration details from user
     record.password=await bcrypt.hash(record.password,10);//hashing the password
     const dbUser=await UserModel.create(record);//Saving Registration Details in database
     res.send(dbUser);//displaying registration details

});

router.post("/login",async(req,res)=>{
     const{username,password}=req.body;//Fetching email and password from User
     const user=await UserModel.findOne({username});//finding respective email id from Database
     isPasswordSame=await bcrypt.compare(password,user.password);//Comparing password from User and Password present in Database
     if(isPasswordSame){
       const token=jwt.sign({email:user.email,password:user.password,id:user._id},process.env.JWT_SECRET);//If passwords are same assigning emailid,role and 
       //Secret Key to JWT Secret key to JWT Token
       res.send({token,userID:user._id});    
     }else{
        res.status(401).send("Unauthorized");
     }  
});



 const verifyToken=(req,res,next)=>{

     const token=req.headers.authorization;
     if(token){

          jwt.verify(token,process.env.JWT_SECRET,(err)=>{
               if(err) return res.sendStatus(403);
               next();
          })
     }

     else{
       res.sendStatus(401);  

     }

} 


module.exports.router=router;
module.exports.verifyToken=verifyToken;



 




