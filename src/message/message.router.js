const router = require('express').Router()
const messageServices = require('./message.services')

const passport = require('passport')
require('../middlewares/auth.middleware')(passport)


// router.post('/',
//     passport.authenticate('jwt', { session: false }),
//     messageServices.getAllMessageByConversation
// )


module.exports = router