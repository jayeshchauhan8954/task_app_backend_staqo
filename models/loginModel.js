const { DataTypes, sequelize } = require('sequelize')
const { login } = require('../controllers/loginController')
const dbInstance=require('../configs/dbConfig')
const login = dbInstance.define('login', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }


})
module.exports = login