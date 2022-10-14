const employRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const createEmploye = require('../utils/createEmploy')
const {getEmployes,employId} = require('../utils/getEmploye');
const checkToken = require('../validation/checkToken');

// get all employe
employRouter.get('/:token',async(req,res) => {
    try {
        var data = jwt.verify(req.params.token, secret);
        const result = await getEmployes(data.toko_id) 
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})

employRouter.get('/:id/:token',async(req,res) => {
    const {id,token} = req.params
    const result = checkToken(token)
    if (result.isSuccess){
        const response = await employId(req.params.id)
        return res.json(response)  
    }
    return res.json(result.response)
})

// add new employe
employRouter.post('/:token',async(req,res) => {
    const token = req.params.token
    const body = req.body
    const result = checkToken(token)
    if (result.isSuccess){
        const response = await createEmploye(body,result.response)
        return res.json(response)
    }
    return res.json(result.response)
})

module.exports = employRouter