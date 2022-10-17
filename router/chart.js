const chartRouter = require('express').Router()
const Transaksi = require('../models/Transaksi')
const checkToken = require('../validation/checkToken')

chartRouter.get('/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    let untung = 0
    result.forEach(doc => trans.push(doc.data()))
    trans.forEach(data => {
        data.items.forEach(item => {
            untung += item.total -  (parseInt(item.modal) * parseInt(item.jumlah))
        })
    })
    res.json({untung})
})

module.exports = chartRouter
// list tanggal = [
//     tanggal : 16/09/2022
//     items : [
//     {
//          item 1
//     },
//      {item 2}
// ]
// ]
// keuntungan per item
// {
//     "tanggal": "16/09/2022 18:30:05",
//     "toko_id": "EMm6fHRG",
//     "items": [
//       {
//         "harga": "11000",
//         "jumlah": "1",
//         "total": "11000",
//         "kategori": "minuman",
//         "nama": "bear brand",
//         "satuan": "kaleng"
//       }
//     ],
//     "user": "admin123"
//   }
// modal 500 harga 1000 jumlah 2
// untung/item = jumlah * [(harga) - (modal)]