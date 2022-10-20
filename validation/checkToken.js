const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

function checkToken(token){
    try {
        const data = jwt.verify(token,secret)
        return {response:data.toko_id,isSuccess:true,data} 
    } catch (error) {
        return {response:error,isSuccess:false}
    }

}

module.exports = checkToken