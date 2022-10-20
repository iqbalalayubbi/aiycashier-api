const fs = require('fs')
const uploadRouter = require('express').Router()
const path = require('path');
const multer = require('multer');
const { uploadFile } = require('../config/db');
const Item = require('../models/Item'); 
const Employe = require('../models/Employe'); 
const User = require('../models/User'); 
const Shop = require('../models/Shop'); 
const checkToken = require('../validation/checkToken')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/images')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});


uploadRouter.post('/:type/:token',upload.single('image'),async (req,res) => {
    try {
        const file = req.file
        const {type,token} = req.params
        const {username,toko_id,role} = checkToken(token).data
        const url = await uploadFile(`./${file.path}`,`items/${file.filename}`);
        
        //  get firebase link img
        const selfLink = url.selfLink.split('/')[8]
        const tokenUrl = url.metadata.firebaseStorageDownloadTokens
        const newUrl = `https://firebasestorage.googleapis.com/v0/b/vue-firebase-263de.appspot.com/o/${selfLink}?alt=media&token=${tokenUrl}`
        
        if (type == 'user'){
            if (role == 'admin'){
                const result = await User.where('username','==',username).get()
                result.forEach(doc => User.doc(doc.id).update({image:newUrl}))
            }else{
                const result = await Employe.where('username','==',username).get()
                result.forEach(doc => Employe.doc(doc.id).update({image:newUrl}))
            }
        }
        else if(type == 'item'){
            const id = parseInt(req.query.id)
            const result = await Item.where('id','==',id).get()
            result.forEach(doc => Item.doc(doc.id).update({image:newUrl}))
        }
        else if(type == 'shop'){
            const result = await Shop.where('toko_id','==',toko_id).get()
            result.forEach(doc => Shop.doc(doc.id).update({image:newUrl}))
        }
        res.json(newUrl)
    } catch (error) {
        res.json({msg:'tidak ada data yang diupload'})
    }

})

module.exports = uploadRouter