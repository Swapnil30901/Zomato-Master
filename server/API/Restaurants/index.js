//Libraries
import express from 'express';

//Database Model
import {RestaurantModel} from '../../database/allModels';


// validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from '../../validation/restaurant'
import { ValidateId } from '../../validation/common'

const Router = express.Router();

/**
 * route    /
 * des      GET all the restaurant details based on the city
 * params   none
 * access   public
 * method   get
 */

Router.post('/', async (req, res) => {
    try{
        await ValidateRestaurantCity(req.query);

        const {city} = req.query;
        const restaurants = await RestaurantModel.find({ city });
        if(restaurants.length === 0){
            return res.json({ error: "No restaurants found in this city" });
        }
        return res.json({ restaurants });

    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});

/**
 * Router      /
 * Des         get individual restaurant details based on id
 * Params      none
 * Access      Public
 * Method      GET
 */

Router.get('/:id', async (req, res) => {
    try{
        await ValidateId(req.params);
        
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant)
            return res.status(400).json({ error: "Restaurant Not Found" });
        return res.json({ restaurant });

    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});
/**
 * Router      /search
 * Des         get individual restaurant details based on search string
 * Params      none
 * Access      Public
 * Method      GET
 */

Router.get('/search/:searchString', async (req, res) => {
    try{
        await ValidateRestaurantSearchString(req.params);
        
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" }
        });
        if (!restaurants)
            return res.status(404).json({ error: `No restaurant matched with ${searchString}` });
        return res.json({ restaurants });
    }catch(error){
        return res.status(500).json({ error: error.message });
}
})
export default Router;