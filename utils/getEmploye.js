const Employe = require('../models/Employe');

// all employ
async function getEmployes(toko_id){
    const result = await Employe.where('toko_id','==',toko_id).get()
    const employe = []

    result.forEach(doc =>{
        employe.push(doc.data())
    })
    return response('user berhasil ditemukan','berhasil',true,employe)
}   

// employ by id
async function employUsername(username){
    const result = await Employe.where('username','==',username).get()
    const employe = []
    result.forEach(doc => employe.push(doc.data()))
    if (result.size == 0) return response('user tidak ditemukan','gagal',false)
    return response('user berhasil ditemukan','berhasil',true,employe)
}


function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = {getEmployes,employUsername}