require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from 'passport';
import session from 'express-session';

//Database Connection 
import ConnectDB from "./database/connection";

//google authentication config
import googleAuthConfig from './config/google.config';

//Private Route Authentication Configuration
import privateRouteConfig from './config/route.config'


// API
import Auth from './API/Auth';
import Restaurants from './API/Restaurants';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Image';
import Order from './API/Orders';
import Review from './API/Reviews';
import User from './API/User';

//passport config
googleAuthConfig(passport);
privateRouteConfig(passport);

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());


// Authentication configuration
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla'
}));

app.use(passport.initialize());
app.use(passport.session());


// Application Routes
app.use("/auth", Auth);
app.use('/restaurant', Restaurants);
app.use('/food', Food);
app.use('/image', Image);
app.use('/menu', Menu);
app.use('/order', Order);
app.use('/review', Review);
app.use('/user', User);


app.get("/", (req, res) => res.json({ message: "Setup success" }));

app.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀"))
    .catch((error) =>
      console.log("Server is running, but database connection failed... ")
    )
);