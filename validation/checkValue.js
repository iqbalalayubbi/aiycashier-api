const angka = '1234567890'
const abjad = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'

function checkValue(username,password){
    if (username.length == 0 || password.length == 0) {
        return {
            msg :'password dan username masih kosong',
            status:'gagal',
            code:400,
            isSuccess : false
        }
    } 
    const user = {}
    const pass = {}
    username.split('').forEach(char => {
        if (angka.includes(char)) user.angka = true
        if (abjad.includes(char)) user.abjad = true
    });
    password.split('').forEach(char => {
        if (angka.includes(char)) pass.angka = true
        if (abjad.includes(char)) pass.abjad = true
    });

    if (user.angka && user.abjad && pass.angka && pass.abjad){
        console.log(user,pass)
        return {
            msg :'password dan username valid',
            status:'berhasil',
            code:200,
            isSuccess : true
        }
    }else{
        console.log(user,pass)
        return {
            msg :'password dan username harus mengandung huruf dan angka',
            status:'gagal',
            code:400,
            isSuccess : false
        }
        
    }
}

module.exports = checkValue