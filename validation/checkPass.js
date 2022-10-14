const bcrypt = require('bcrypt');
const User = require('../models/User');
const Employe = require('../models/Employe');

async function checkUser(username,password){
    let user = []
    const result = await User.where('username','==',username).get()
    result.forEach(doc => user = doc.data())
    if (result.size == 0) return false
    return await bcrypt.compare(password, user.password)
}

async function checkEmploye(username,password){
    let employe = []
    const result = await Employe.where('username','==',username).get()
    result.forEach(doc => employe = doc.data())
    if (result.size == 0) return false
    return await bcrypt.compare(password, employe.password)
}

module.exports = {checkUser,checkEmploye}