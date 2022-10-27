const chartRouter = require('express').Router()
const Transaksi = require('../models/Transaksi')
const checkToken = require('../validation/checkToken')


chartRouter.get('/item/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    result.forEach(doc => trans.push(doc.data()))
    const topItems = getTopItems(trans)
    res.json(topItems)
})

function getTopItems(transaksi){
    const dataTop = []
    const items = []
    const allId = []
    transaksi.forEach(trans => {
        trans.items.forEach(item => {
            items.push(item)
            if (!allId.includes(item.id)) {
                dataTop.push({id:item.id,nama:item.nama,total:[]})
                allId.push(item.id)
            }
        })
    });
    

    allId.forEach(id => {
        items.forEach(item => {
            if(item.id == id){
                dataTop.forEach(data => {
                    if (data.id == id){
                        data.total.push(parseInt(item.jumlah))
                    }
                })
            } 
        })
    })
    
    dataTop.forEach(data => {
        data.all = data.total.reduce((val,acc) => val + acc)
    })


    return dataTop
}


chartRouter.get('/profit/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    const dates = []
    result.forEach(doc => trans.push(doc.data()))

    trans.forEach(data => {
        const item = data.items[0]
        const tanggal = item.tanggal.split(' ')[0]
        if (!dates.includes(tanggal)) dates.push(tanggal)
    })
    
    const allProfit = getProfit(dates,trans)
    res.json(allProfit)
})

chartRouter.get('/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    let untung = 0
    // let profit = []
    result.forEach(doc => trans.push(doc.data()))
    try {
        trans.forEach(data => {
            if (data.items.length !== 0){
                data.items.forEach(item => {
                    untung += item.total -  (parseInt(item.modal) * parseInt(item.jumlah))
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
    res.json({untung})
    // res.json(profit)
})

function getProfit(dates,trans){
    const newProfit = []
    const allProfit = []
    dates.forEach(date => {
        newProfit.push({
            tanggal:date,
            untung: 0
        })

        trans.forEach(data =>{
            const item = data.items[0]
            const tanggal = item.tanggal.split(' ')[0]
    
            if (tanggal == date){
                allProfit.push({
                    tanggal,
                    untung: parseInt(item.total) - (parseInt(item.modal) * parseInt(item.jumlah))
                })
            }
        })
        
        
    })

    newProfit.forEach(profit => {
        allProfit.forEach(data => {
            if (data.tanggal == profit.tanggal){
                profit.untung += data.untung
            }
        })
    })


    return newProfit
    
}


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