const User = require('../models/User');
const Employe = require('../models/Employe')

async function checkUsername(username){
    const resUser = await User.where('username','==',username).get()
    const resEmploye = await Employe.where('username','==',username).get()
    if (resUser.size == 0 && resEmploye == 0){
        return response('username belum ada','berhasil',true)
    }else{
        return response('username sudah ada','gagal',false)
    }
}

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = checkUsername