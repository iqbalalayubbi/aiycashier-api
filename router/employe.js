const employRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const createEmploye = require('../utils/createEmploy');
const deleteEmploye = require('../utils/deleteEmploye');
const {getEmployes,employUsername} = require('../utils/getEmploye');
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

employRouter.get('/:username/:token',async(req,res) => {
    const {username,token} = req.params
    const result = checkToken(token)
    if (result.isSuccess){
        const response = await employUsername(username)
        return res.json(response)  
    }
    return res.json(result.response)
})

// delete employe
employRouter.delete('/:username/:token',async(req,res) => {
    const {username,token} = req.params
    const result = checkToken(token)
    if (result.isSuccess){
        const response = await deleteEmploye(username)
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