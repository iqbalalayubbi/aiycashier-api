const User = require('../models/User');
const {getUsername} = require('../utils/getUsers')
const randChar = require("randomstring");

// bcrypt
const bcrypt = require('bcrypt');
const checkValue = require('../validation/checkValue');
const saltRounds = 10;

// password dan username harus kombinasi angka dan huruf
async function createUser(body){
    const {username,password} = body
    const users = await getUsername(username)
    
    if (users.length == 0){
        const validate = checkValue(username,password)
        if (validate.isSuccess){
            const user = await dataUser(username,password)
            await User.add(user)
            return validate
        }else{
            return validate
        }
    }else{
        return response('username sudah ada','gagal',false,302)
    }
}

function response(msg,status,isSuccess,code = 200){
    return {msg,status,isSuccess,code}
}

async function dataUser(username,password){
    const hash = await bcrypt.hash(password, saltRounds);
    return {
        id : randChar.generate(5),
        nama : username,
        username,
        password : hash,
        role:'admin',
        toko_id :  randChar.generate(8),
        isNew:true
    }
}

module.exports = createUser