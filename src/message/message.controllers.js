const uuid = require('uuid')
const Messages = require('../models/message.models')

const getAllMessageByConversation = async (conversationId) => {
    return await Messages.findAll({
        where: {
            conversationId
        }
    })
}


const createMessage = async (data) => {
    const response = await Messages.create({
        id: uuid.v4(),
        senderId: data.userId,
        conversationId: data.chatId,
        message: data.message
    })
    return response
}

module.exports = {
    getAllMessageByConversation,
    createMessage
}