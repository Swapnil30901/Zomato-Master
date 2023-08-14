require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

//Database Connection 
import ConnectDB from "./database/connection";

// API
import Auth from './API/Auth'


require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});
var mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// Application Routes
app.use("/auth", Auth);

app.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running!!!");
    }).catch((error)=>{
        console.log("Server is running,but database connection failed...");
        console.log(error);
    });
});

app.get('', (req,res)=> {

});