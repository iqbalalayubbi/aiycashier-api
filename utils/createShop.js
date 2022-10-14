const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const randStr = require('randomstring');
const Shop = require('../models/Shop')
const User = require('../models/User');

async function createShop(body,token){
    try {
        const data = jwt.verify(token, secret);
        const result = await Shop.where('toko_id','==',data.toko_id).get();
        if (result.size > 0) return response('toko sudah ada','gagal',false)

        await Shop.add(shopData(body,data.toko_id,data.username))
        await userStatus(data.username)
        return response('toko berhasil dibuat','berhasil',true)
    } catch (error) {
        return error
    }
}

function shopData(body,toko_id,username){
    return {
        id : randStr.generate(5),
        toko_id,
        nama : body.nama,
        admin : username,
        alamat:body.alamat
    }
}

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

async function userStatus(username){
    const result = await User.where('username','==',username).get()
    let id
    result.forEach(doc => {
        id = doc.id
    })
    await User.doc(id).update({
        isNew:false
    })
}

module.exports = createShop