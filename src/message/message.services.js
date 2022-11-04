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


const postMessage = (req, res) => {
    const userId = req.user.id;
    const { message } = req.body;
    const chatId = req.params.id;

    if (message) {
        messageControllers.createMessage({message, userId, chatId})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: 'Missing data',
            fields: {
                message: 'string'
            }
        })
    }
}


module.exports = {
    getAllMessageByConversation,
    postMessage
}