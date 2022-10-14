const Item = require('../models/Item');

async function updateItem(id,toko_id,body){
    const result = await Item.where('id','==',id).get()
    let isSuccess
    result.forEach(doc => {
        if(doc.data().toko_id == toko_id){
            Item.doc(doc.id).update(body)
            isSuccess = true
        }
    })
    if (isSuccess) return response('Barang berhasil diubah','berhasil',true)
}

function response(msg,status,isSuccess){
    return {msg,status,isSuccess}
}

module.exports = updateItem