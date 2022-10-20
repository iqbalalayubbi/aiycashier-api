const transRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const Transaksi = require('../models/Transaksi')
const Item = require('../models/Item')
const moment = require('moment')

transRouter.get('/:token',async(req,res) => {
    try {
        const data = jwt.verify(req.params.token, secret);
        const toko_id = data.toko_id
        const result = await Transaksi.where('toko_id','==',toko_id).get()
        if (result.size == 0 ) return res.json(response('data tidak ditemukan','gagal',false))
    
        const transaksi = []
        result.forEach(doc => transaksi.push(doc.data()))
        res.json(response('data ditemukan','berhasil',true,transaksi))
    } catch (error) {
        res.json(error)
    }
})

transRouter.post('/:token',async(req,res) => {
    const items = req.body
    console.log(items)
    const itemData = await Item.get()

    items.forEach(item => {
        itemData.forEach(ite =>{
            const daItem = ite.data()
            if (item.id == daItem.id){
                Item.doc(ite.id).update({stok:daItem.stok - item.jumlah})
            }
        })
    })

    const time = moment().format('D/M/YYYY HH:mm:ss')
    const data = jwt.verify(req.params.token, secret);
    const item = {
        tanggal:time,
        toko_id:data.toko_id,
        user:data.username,
        items
    }
    await Transaksi.add(item)
    res.json(response('transaksi ditemukan','berhasil',true))
})

function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = transRouter