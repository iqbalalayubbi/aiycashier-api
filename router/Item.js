const createItem = require('../utils/createItem');
const ItemRouter = require('express').Router();
const {getItems,itemId, getItemsTotal} = require('../utils/getItem');
const deleteItem = require('../utils/deleteItem');
const checkToken = require('../validation/checkToken');
const updateItem = require('../utils/updateItem');

// get all item
ItemRouter.get('/:token',async(req,res) => {
    try {
        const result = checkToken(req.params.token)
        const toko_id = result.response
        const username = result.data.username
        const role = result.data.role
        const response = await getItems(toko_id,username,role)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

// get item total
ItemRouter.get('/total/:token',async(req,res) => {
    try {
        const result = checkToken(req.params.token)
        const toko_id = result.response
        const response = await getItemsTotal(toko_id)
        res.json(response)
    } catch (error) {   
        res.json(error)
    }
})

// search item by id
ItemRouter.get('/:id/:token',async(req,res) => {
    const {id,token} = req.params
    const result = checkToken(token)
    console.log(result.response,id)
    if (result.isSuccess){
        const toko_id = result.response
        const item = await itemId(parseInt(id),toko_id)
        return res.json(item)
    }
    res.json(result.response)
})

// tambah data item
ItemRouter.post('/:token',async(req,res) => {
    const body = req.body
    const token = req.params.token
    const response = await createItem(body,token)
    res.json(response)
})

// ubah item
ItemRouter.put('/:id/:token',async(req,res) => {
    const body =req.body
    const {id,token} = req.params
    const result = checkToken(token)
    if (result.isSuccess){
        const toko_id = result.response
        const response = await updateItem(parseInt(id),toko_id,body)
        return res.json(response)
    }
    res.json(result.response)
})

ItemRouter.delete('/:id/:token',async(req,res) => {
    const {id,token} = req.params
    const response = await deleteItem(parseInt(id),token)
    res.json(response)
})

function response(msg,status,isSuccess,data = []){
    return {msg,status,isSuccess,data}
}

module.exports = ItemRouter