const createShop = require('../utils/createShop');
const shopRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getShop = require('../utils/getShop');
const updateShop = require('../utils/updateShop');
const secret = process.env.SECRET_KEY

// get shop by toko_id
shopRouter.get('/:token',async(req,res) => {
    try {
        const token = req.params.token
        const data = jwt.verify(token, secret);
        const response = await getShop(data.toko_id)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

// create new shop
shopRouter.post('/:token',async(req,res) => {
    try {
        const body = req.body;
        const token = req.params.token
        const response = await createShop(body,token)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

// update shop
shopRouter.put('/:token',async(req,res) => {
    try {
        const body = req.body
        const token = req.params.token
        const data = jwt.verify(token, secret);
        const response = await updateShop(body,data.toko_id)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})


module.exports = shopRouter