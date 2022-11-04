const { DataTypes, UUID } = require('sequelize')
const db = require('../utils/database')
const Users = require('./users.models')

const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        field: 'image_url',
        validate: {
            // isUrl: true
        }
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
        references: {
            key: 'id',
            model: Users
        }
    }
}, {
    timestamps: false
})

module.exports = Conversations