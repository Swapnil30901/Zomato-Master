//Libraries
import express from 'express';
import passport from 'passport';


//Database Model
import { OrderModel } from '../../database/allModels'

//Validate user
import ValidateUser from '../../config/validateUser'

const Router = express.Router();

/**
 * Router      /:id
 * Des         get all orders based on particular id
 * Params      none
 * Access      Private
 * Method      GET
 */

Router.get('/:_id', passport.authenticate("jwt") , async (req, res) => {
    try{
        await ValidateUser(req, res);
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user:_id });

        if(!getOrders){
            return res.status(400).json({ error: `UserNot found` })
        }
        return res.status(200).json({ orders: getOrders })
    }catch(error){
            return res.status(500).json({ error: error.message });
    }
});
/**
 * Router      /new/:_id
 * Des         add new order
 * Params      none
 * Access      Private
 * Method      POST
 */
Router.post('/new/:_id', passport.authenticate("jwt"), async (req, res) => {
    try{
        const {_id} = req.params;
        const {orderDetails}  = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            { 
                user:_id 
            },
            {
                $push: { orderDetails },
            },
            {
                new: true
            }
            );

        return res.json({ order: addNewOrder });

    } catch(error) {
            return res.status(500).json({ error: error.message });
    }
});

export default Router;