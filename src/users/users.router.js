const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
const userServices = require('./users.services')

//! para rutas protegidas
require('../middlewares/auth.middleware')(passport)



//? Rutas raiz

router.get('/', 
    // passport.authenticate('jwt', {session: false}),
    userServices.getAllUsers)

//Todo el register ira en la ruta /auth/register

//! router.route('/').get(userServices.getAllUsers)


//? Ruta de informacion propia del usuario loggeado
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser)
    .patch(
        passport.authenticate('jwt', {session: false}),
        userServices.patchMyUser
    )
    .delete(
        passport.authenticate('jwt', {session: false}),
        userServices.deleteMyUser
    )

//? Rutas dinamicas por ID /users/:id

//! router.get('/:id')
//! router.put('/:id')
//! router.patch('/:id')
//! router.delete('/:id ')

//? /api/v1/users/:id
router.route('/:id')
    .get(userServices.getUserById)
    .patch(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.patchUser)
    .delete(
        passport.authenticate('jwt', {session: false}),
        adminValidate,
        userServices.deleteUser)


module.exports = router