const Users = require('./users.models')
const Conversations = require('./conversations.models')
const Message =require('./message.models')
const Participants =require('./participants.models')


const initModels = () => {

    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    Users.hasMany(Message)
    Message.belongsTo(Users)

    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    Conversations.hasMany(Message)
    Message.belongsTo(Conversations)



}

module.exports = initModels