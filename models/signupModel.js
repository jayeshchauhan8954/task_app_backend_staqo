const { DataTypes } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')

const User = dbInstance.define('user', {
    userName: {
        type: DataTypes.STRING,
        alowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        alowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        alowNull: false

    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
})
User.sync({alter:true})

module.exports = {
    User
}