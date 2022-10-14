const regRouter = require('express').Router();
const createUser = require('../utils/createUser')
const {getUsers} = require('../utils/getUsers')

regRouter.post('/',async(req,res) => {
    const response = await createUser(req.body)
    res.statusCode = response.code
    res.json(response)

})

module.exports = regRouter