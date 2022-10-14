const Shop = require('../models/Shop');

async function updateShop(body,toko_id){
    const result = await Shop.where('toko_id','==',toko_id).get()
    let id
    if (result.size == 0) return response('toko belum dibuat','gagal',false)
    result.forEach(doc => {
        id = doc.id
    })
    await Shop.doc(id).update(body)
    return response('toko berhasil diubah','berhasil',true)
}

function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = updateShop