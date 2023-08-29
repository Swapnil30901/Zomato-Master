//Libraries
import express from 'express';

//Database Model
import {FoodModel} from '../../database/allModels';

//Validation
import { ValidateId, ValidateCategory } from '../../validation/common';

const Router = express.Router();

/**
 * Router      /r/:id
 * Des         get all  food based on particular restaurant
 * Params      none
 * Access      Public
 * Method      GET
 */

Router.get('/r/:_id', async (req, res) => {
    try{
        await ValidateId(req.params);

        const {_id} = req.params;
        const foods = await FoodModel.findById({ restaurant: _id });

        return res.json({ foods });

    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});

/**
 * Router      /c/:category
 * Des         get all  food based on particular category
 * Params      none
 * Access      Public
 * Method      GET
 */

Router.get('/c/:category', async (req, res) => {
    try{
        await ValidateCategory(req.params);

        const {category} = req.params;
        const foods = await FoodModel.find({ category: {$regex: category, options: "i"} });

        if (!foods)
            return res.status(404).json({ error: `No Food found matched with ${category}` })
        
        return res.json({ foods });



    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});


export default Router;