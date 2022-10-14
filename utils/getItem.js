const Item = require('../models/Item');

async function getItems(toko_id){
    const items = []
    const result = await Item.where('toko_id','==',toko_id).get()
    if (result.size == 0) return response('barang masih kosong','berhasil',true,items)
    result.forEach(doc => {
        items.push(doc.data())
    });
    return response('barang ditemukan','berhasil',true,items)
    // return items
}

async function itemId(id,toko_id){
    const items = []
    const response = await Item.where('id','==',id).get()
    if(response.size == 0) return 'item tidak ditemukan'
    response.forEach(doc => {
        if(doc.data().toko_id == toko_id){
            items.push(doc.data())
        }
    });
    return items
}

function response(msg,status,isSuccess,data){
    return {msg,status,isSuccess,data}
}

module.exports = {getItems,itemId}