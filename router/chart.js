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
    trans.forEach(tr => {
        const exDate = tr.tanggal.split(' ')[0]
        if (!dates.includes(exDate)) dates.push(exDate)
    })

    const newTrans = []
    dates.forEach(date => newTrans.push({tanggal:date,items:[]}))

    newTrans.forEach(newTr => {
        trans.forEach(tr => {
            const exDate = tr.tanggal.split(' ')[0]
            if(exDate == newTr.tanggal){
                tr.items.forEach(t => {
                    newTr.items.push(t)
                })
            }
        })
    })
    const allProfit = getProfit(newTrans)
    
    res.json(allProfit)
})

chartRouter.get('/:token',async(req,res) => {
    const toko_id = checkToken(req.params.token).response
    const result = await Transaksi.where('toko_id','==',toko_id).get()
    const trans = []
    let untung = 0

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
})

function getProfit(data){
    // tanggal dan untung
    // {tanggal:19/10/2022,untung:2000}
    const dataProfit = []
    const newTrans = data
    let untung = 0
    newTrans.forEach((trans) => {
        const items = trans.items
        if (dataProfit.length == 0){
            const tanggal = trans.tanggal
            items.forEach(item => {
                untung += parseInt(item.total) - (parseInt(item.modal) * parseInt(item.jumlah))
            })
            dataProfit.push({tanggal,untung})
        }else{
            dataProfit.forEach(data => {
                if(data.tanggal !== trans.tanggal){
                    const tanggal = trans.tanggal
                    items.forEach(item => {
                        untung += parseInt(item.total) - (parseInt(item.modal) * parseInt(item.jumlah))
                    })
                    dataProfit.push({tanggal,untung})
                }
            })
        }
    })
    return dataProfit
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