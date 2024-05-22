const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const PORT=process.env.PORT;
app.use(express.json());
app.use(cors());
const mongoose=require("mongoose");
const UserModel=require("./models/userSchema");
const getUserRouter=require('./routes/users');
const UserRouter=getUserRouter.router;
const recipieRouter=require("./routes/recipies");
app.use("/auth",UserRouter);
app.use("/recipies",recipieRouter);
mongoose.connect(process.env.MONGODBURI).then(()=>{
    console.log("Connected to MongoDB");
})

app.listen(PORT,()=>{
    console.log("Server is listening at PORT"+PORT);
})