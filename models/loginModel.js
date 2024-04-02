const { DataTypes, sequelize } = require('sequelize')
const { login } = require('../controllers/loginController')

const login = dbInstance.define('login', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


})
module.exports = login