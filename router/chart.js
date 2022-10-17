const chartRouter = require('express').Router()
const Transaksi = require('../models/Transaksi')
const checkToken = require('../validation/checkToken')

chartRouter.get('/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    const allDate = []
    const data = []
    result.forEach(doc => trans.push(doc.data()))
    trans.forEach(tr =>{
        const date = tr.tanggal.split(' ')[0]
        if (!allDate.includes(date)) allDate.push(date)
    })

    const tanggal = '17/09/2022'
    trans.forEach(tr =>{
        const date = tr.tanggal.split(' ')[0]
        if (tanggal == date) data.push(tr.items)
    })

    let untung = 0
    data.forEach(m => {
        m.forEach(d => {
            untung +=  parseInt(d.total) - (parseInt(d.jumlah)*parseInt(d.modal))
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