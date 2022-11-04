//? va ha contrener las rutas de authentication y autorization
//* login
//* register
//* recovery password
//* verify-user


const router = require('express').Router()
const authServices=require('./auth.services')
const { registerUser } = require('../users/users.services')

//? /api/v1/auth

router.post('/register', registerUser)

router.post('/login', authServices.login)

module.exports = router