const Item = require('../models/Item');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

async function deleteItem(id,token){
    const data = jwt.verify(token,secret)
    const result = await Item.where('id','==',id).get()
    result.forEach(doc => {
        if (data.toko_id == doc.data().toko_id){
            Item.doc(doc.id).delete()
        }
    })
    return response('barang berhasil dihapus','berhasil',true)
}

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = deleteItem