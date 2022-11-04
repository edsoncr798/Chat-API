const bcrypt = require('bcrypt');


//? en esta funcion encryptamos la contraseña del usuario
//? cuando se crea o se modifica la contraseña  
const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10)
}

//? Comparar si la contraseña edson123 es = a  $2b$10$ghhOtamt7D6qruF9.2BBmOhjT20mBofkMLNilVpIs32i/4kZwx8hK
const comparePassword=(plainPassword, hashedPassword)=>{
    //! Esta utilidad se usa cuando hacemos un login y recibimos la pass del usuario
    //! y la comparamos con la que tenmos en la DB 
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

// console.log(hashPassword('edson1234'))
// console.log(comparePassword('edson1234','$2b$10$ghhOtamt7D6qruF9.2BBmOhjT20mBofkMLNilVpIs32i/4kZwx8hK'))


module.exports={
    hashPassword,
    comparePassword
}