//* Email y contraseña del usuario

const { getUserByEmail } = require("../users/users.controllers")
const { comparePassword } = require('../utils/crypto')

//? El email es unico en mi base de datos 

const loginUser = async (email, password) => {
    //* Este controlador tiene 2 posibles respuestas 
    //* 1 Las credenciales son validas y retornamos el usuario 
    //* 2 Las credenciales son invalidas y retornamos false
    try {
        const user = await getUserByEmail(email)
        //? user.password contiene la contraseña encriptada de mi base de datos
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        }
        return false
    } catch (err) {
        return false
    }
}


// loginUser('edsoncr798@gmail.com', 'edson12368')
//     .then(res=>{
//         console.log(res)
//     })
//     .catch(err=>{
//         console.log(err)
//     })

module.exports = {
    loginUser
}

