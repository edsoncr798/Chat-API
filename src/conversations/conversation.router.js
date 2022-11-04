const router = require('express').Router()
const {getAllMessageByConversation, postMessage} = require('../message/message.services')
const passport = require('passport')

const conversationServices = require('./conversation.services')
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        conversationServices.getAllConversation)
    .post(
        passport.authenticate('jwt', { session: false }),
        conversationServices.postConversation)


router.route('/:id')
        .get(
            passport.authenticate('jwt', {session: false}),
            conversationServices.getAllConversationById
        )
        .patch(
            passport.authenticate('jwt', {session:false}),
            conversationServices.patchConversation
        )
        .delete(
            passport.authenticate('jwt', {session:false}),
            conversationServices.deleteConversation
        )

router.route('/:id/message')
            .get(
                passport.authenticate('jwt', {session: false}),
                getAllMessageByConversation)
            .post(
                passport.authenticate('jwt', {session: false}),
                postMessage)


module.exports = router
