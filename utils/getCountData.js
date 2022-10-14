const Employe = require('../models/Employe')
const Item = require('../models/Item')

async function getCountEmploy(toko_id){
    const data = await Employe.where('toko_id','==',toko_id).get()
    return data.size
}

async function getCountItem(toko_id){
    const data = await Item.where('toko_id','==',toko_id).get()
    return data.size
}

module.exports = {getCountEmploy,getCountItem}