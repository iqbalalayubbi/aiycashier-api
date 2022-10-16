const Employe = require('../models/Employe');

async function deleteEmploye(username){
    const result = await Employe.where('username','==',username).get()
    result.forEach(doc => Employe.doc(doc.id).delete())
    return response('karyawan berhasil diberhentikan','berhasil',true)
}

function response(msg,status,isSuccess){
    return{
        msg,
        status,
        isSuccess
    }
}

module.exports = deleteEmploye