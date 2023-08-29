//Libraries
import express from 'express';

//Database Model
import {MenuModel, ImageModel } from '../../database/allModels';

const Router = express.Router();

/**
 * Router      /list
 * Des         GET all list of menu based on restaurant
 * Params      _id
 * Access      Public
 * Method      GET
 */

Router.get('/list/:_id', async (req, res) => {
    try{
        const {_id} = req.params;
        const menus = await ImageModel.findById(_id);
        if (!menus) {
            return res.status(404).json({ error: "No menu present for this restaurant" });
        }

        return res.json({ menus });

    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});

/**
 * Router      /image/:_id
 * Des         get all  food based on particular category
 * Params      none
 * Access      Public
 * Method      GET
 */

Router.get('/image/:_id', async (req, res) => {
    try{
        const {_id} = req.params;
        const menuImages = await MenuModel.findOne(_id);

        return res.json({ menuImages });

    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});


export default Router;