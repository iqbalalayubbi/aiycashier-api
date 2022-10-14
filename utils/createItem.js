const Item = require('../models/Item');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const randChar = require("randomstring");
const { getCountItem } = require('./getCountData');
const checkToken = require('../validation/checkToken');

async function createItem(body,token){
    const result = checkToken(token)
    if (result.isSuccess){
        const toko_id = result.response
        const item = {
            id:await getCountItem(toko_id)+1,
            nama:body.nama,
            kategori:body.kategori,
            satuan:body.satuan,
            modal:body.modal,
            harga:body.harga,
            stok:body.stok,
            toko_id:result.response
        }
        await Item.add(item)
        return response('barang berhasil ditambahkan','berhasil',true)
    }else{
        return result.response
    }
}


function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = createItem