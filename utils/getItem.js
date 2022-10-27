const Item = require('../models/Item');

async function getItems(toko_id,username,role){
    const items = []
    const result = await Item.where('toko_id','==',toko_id).get()
    if (result.size == 0) return response('barang masih kosong','berhasil',true,items)
    result.forEach(doc => {
        items.push(doc.data())
    });
    return response('barang ditemukan','berhasil',true,items,username,role)
    // return items
}

async function getItemsTotal(toko_id){
    const result = await Item.where('toko_id','==',toko_id).get()
    return {total:result.size}
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

function response(msg,status,isSuccess,data,username,role){
    return {msg,status,isSuccess,data,username,role}
}

module.exports = {getItems,itemId,getItemsTotal}