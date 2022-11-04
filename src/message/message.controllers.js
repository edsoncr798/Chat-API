const Messages = require('../models/message.models')

const getAllMessageByConversation = async (conversationId) => {
    return await Messages.findAll({
        where:{
            conversationId
        }
    })
}


// const createMessage=async (message)=>{
//     return await Messages.create({message})
// }

module.exports={
    getAllMessageByConversation
}