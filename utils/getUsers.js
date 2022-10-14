const User = require('../models/User');

async function getUsers(){
    const data = await User.get()
    const users = []
    data.forEach(doc => {
        users.push(doc.data())
    })
    return users
}

async function getUsername(username){
    const data = await User.where('username','==',username).get()
    const users = []
    if (data.size !== 0){
        data.forEach(doc => {
            users.push(doc.data())
        })
        return users[0]
    }else return users
}

async function getUserId(id){
    const data = await User.where('id','==',id).get()
    const users = []
    data.forEach(doc => {
        users.push(doc.data())
    })
    return users[0]
}

module.exports = {getUsers,getUsername}