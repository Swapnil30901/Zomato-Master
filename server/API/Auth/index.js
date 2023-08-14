// Library
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


// Models
import {UserModel} from '../../database/allModels'


// Create a router
const Router = express.Router();

/**
 * Router      /Signup
 * Des         Register new user
 * Params      none
 * Access      Public
 * Method      Post
 */
Router.post("/signup", async (req,res)=>{
    try{
        const {email, password, fullName, phoneNumber}= req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if(checkUserByEmail || checkUserByPhone){
            return res.json({
                user: "User already exists!"
            });
        }

        //hash password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);


        // save data to database
        await UserModel.create({...req.body.credentials, password: hashedPassword });

        // generate JWT auth token(package name is jsonwebtoken)
        const token = jwt.sign({ user : {fullName, email}}, "ZomatoApp");

        return res.status(200).json({token, status: "success"})
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;