const tokenRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

tokenRouter.get('/:token',(req,res) => {
    const token = req.params.token
    const data = jwt.verify(token, secret);
    res.json({data})
})

module.exports = tokenRouter