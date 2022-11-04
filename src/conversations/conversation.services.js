const conversationsControllers = require('./conversation.controllers')
const { host } = require('../config')
const { json } = require('sequelize')

const getAllConversation = (req, res) => {
    const offset = Number(req.query.offset) || 0

    const limit = Number(req.query.limit) || 10

    const urlBase = `${host}/api/v1/conversations`

    conversationsControllers.getAllConversation(offset, limit)
        .then(data => {



            const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null
            const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset - limit}&limit=${limit}` : null

            res.status(200).json({
                next: nextPage,
                prev: prevPage,
                items: data.count,
                offset,
                limit,
                results: data.rows
            })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}


const getAllConversationById = (req, res) => {
    const id = req.params.id;
    conversationsControllers.getConversationById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}


const postConversation = (req, res) => {

    const userId = req.user.id;
    const { title, imageUrl } = req.body;

    if (title && imageUrl) {
        conversationsControllers.createConversation({ title, imageUrl, userId })
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
                title: 'string',
                imageUrl: 'string'
            }
        })
    }

}


const patchConversation = (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    conversationsControllers.updateConversation(id, { title })
        .then(data => {
            res.status(200).json({ message: `Your conversation was edited succesfully!` })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })

}


const deleteConversation = (req, res) => {
    const id = req.params.id;

    conversationsControllers.deleteConversation(id)
        .then(data => {
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllConversation,
    postConversation,
    patchConversation,
    deleteConversation,
    getAllConversationById
}