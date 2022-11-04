const messageControllers = require('./message.controllers')

const getAllMessageByConversation = (req, res) => {
    const conversationsId = req.params.id;
    messageControllers.getAllMessageByConversation(conversationsId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllMessageByConversation
}