const Employe = require('../models/Employe')
const User = require('../models/User')
const { checkEmploye, checkUser } = require('../validation/checkPass')
const valRouter = require('express').Router()
const checkToken = require('../validation/checkToken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

valRouter.put(('/password/:token'),async(req,res) => {
    const {pass,newPass} = req.body
    const token = req.params.token
    const {role,username} = checkToken(token).data
    console.log(req.body)
    if (role == 'admin'){
        const userValid = await checkUser(username,pass)
        if (userValid){
            const hash = await bcrypt.hash(newPass, saltRounds);
            const userData = await User.where('username','==',username).get()
            userData.forEach(doc => User.doc(doc.id).update({password:hash}))
            return res.json(response('password berhasil diubah','berhasil',true))
        }
        return res.json(response('password lama tidak valid','gagal',false))
    }else{
        const employValid = await checkEmploye(username,pass)
        if (employValid){
            const hash = await bcrypt.hash(newPass, saltRounds);
            const employData = await Employe.where('username','==',username).get()
            employData.forEach(doc => Employe.doc(doc.id).update({password:hash}))
            return res.json(response('password berhasil diubah','berhasil',true))
        }
        return res.json(response('password lama tidak valid','gagal',false))
    }

})

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = valRouter