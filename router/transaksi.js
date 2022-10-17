const transRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
const Transaksi = require('../models/Transaksi')
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


function formatTime(){
    const time = new Date()
    let date = [
        time.getDate(),
        time.getMonth(),
        time.getFullYear()
    ]
    let timeNow = [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
    ]
    timeNow.forEach((tm,i) => {
        if (tm < 10) {
            const timeArr = tm.toString().split('')
            timeArr.splice(0,0,0)
            timeNow[i] = timeArr.join('')
        }
    })

    date.forEach((d,i) => {
        if (d < 10) {
            const dateArr = d.toString().split('')
            dateArr.splice(0,0,0)
            date[i] = dateArr.join('')
        }
    })

    return `${date.join('/')} ${timeNow.join(':')}`
}

function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = transRouter