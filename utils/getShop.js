const Shop = require('../models/Shop');

// get shop by toko id
async function getShop(toko_id){
    const result = await Shop.where('toko_id','==',toko_id).get()
    const shop = []
    if (result.size == 0) return response('toko tidak ditemukan','gagal',false)
    result.forEach(doc => shop.push(doc.data()))
    return response('toko berhasil ditemukan','berhasil',true,shop[0])
}

function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = getShop
