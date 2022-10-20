const {getUsername} = require('../utils/getUsers')
const jwt = require('jsonwebtoken');
const logRouter = require('express').Router();
const {checkUser,checkEmploye} = require('../validation/checkPass')
const secret = process.env.SECRET_KEY
const { employUsername } = require('../utils/getEmploye');

logRouter.post('/',async(req,res) => {
    const {username,password} = req.body    
    try {
        const user = await getUsername(username)
        const userValid = await checkUser(username,password)
        const resEmploye = await employUsername(username)
        const employe = resEmploye.data[0]
        const employeValid = await checkEmploye(username,password)
        if (userValid){
            const token = createToken(user.id,user.username,user.role,user.toko_id)
            res.statusCode = 200
            res.json(response('berhasil login','berhasil',true,token,user.isNew))
        }else if(employeValid){
            const token = createToken(employe.id,employe.username,employe.role,employe.toko_id)
            res.statusCode = 200
            res.json(response('berhasil login','berhasil',true,token))
        }else{
            res.statusCode = 401
            res.json(response('password atau username salah','gagal',false))
        }
    } catch (error) {
        res.json(error)
    }
})

function createToken(id,username,role,toko_id){
    const data = {id,username,role,toko_id}
    return jwt.sign(data, secret, { algorithm: 'HS256'});
}

function response(msg,status,isSuccess,token = '',isNew = false){
    return {msg,status,isSuccess,token,isNew}
}

module.exports = logRouter