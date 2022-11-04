const Conversations = require('../models/conversations.models')
const uuid = require('uuid')
const Users = require('../models/users.models')
const Messages = require('../models/message.models')

const getAllConversation = async (offset, limit) => {
    const data = await Conversations.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes:{
            exclude:['userId', 'createdBy']
        },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
                model: Messages
            }
        ]
    })
    return data
}


const getConversationById = async (id) => {
    return await Conversations.findOne({
        where: {
            id
        }
    })
}


const createConversation = async (data) => {
    const response = await Conversations.create({
        id: uuid.v4(),
        title: data.title,
        imageUrl: data.imageUrl,
        createdBy: data.userId
    })
    return response
}

const updateConversation = async (id, data) => {
    return await Conversations.update(data, {
        where: {
            id
        }
    })
}

const deleteConversation = async (id) => {
    return await Conversations.destroy({
        where: {
            id
        }
    })
}


module.exports = {
    getAllConversation,
    getConversationById,
    createConversation,
    deleteConversation,
    updateConversation
}