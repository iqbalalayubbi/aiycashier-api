// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Employe = require('../models/Employe');
const {getCountEmploy} = require("./getCountData");

async function createEmploye(body,toko_id){
    // return getCountEmploy(toko_id)
    const hash = await bcrypt.hash(body.password, saltRounds)
    const employe = {
        id : await getCountEmploy(toko_id)+1,
        username:body.username,
        nama:body.username,
        no_hp:'08123456789',
        role:body.role,
        password:hash,
        toko_id
    }
    await Employe.add(employe)
    return response('akun karyawan berhasil dibuat','berhasil',true)
}

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = createEmploye