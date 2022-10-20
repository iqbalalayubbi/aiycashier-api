const userRouter = require('express').Router()
const Employe = require('../models/Employe');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

userRouter.get('/:token',async (req,res) => {
    const token = req.params.token
    const result = jwt.verify(token,secret)
    const {username,role} = result
    if (role == 'admin'){
        const response = await User.where('username','==',username).get()
        const user = []
        response.forEach(doc => user.push(doc.data()))
        return res.json(user)
    }else{
        const response = await Employe.where('username','==',username).get()
        const user = []
        response.forEach(doc => user.push(doc.data()))
        return res.json(user)

    }
})

userRouter.put('/:token',async (req,res) => {
    const token = req.params.token
    const result = jwt.verify(token,secret)
    const {username,role} = result
    if (role == 'admin'){
        const response = await User.where('username','==',username).get()
        response.forEach(doc => User.doc(doc.id).update(req.body))
        return res.json({msg:'data user berhasil diubah'})
    }else{
        const response = await Employe.where('username','==',username).get()
        response.forEach(doc => Employe.doc(doc.id).update(req.body))
        return res.json({msg:'data user berhasil diubah'})
    }
})

module.exports = userRouter