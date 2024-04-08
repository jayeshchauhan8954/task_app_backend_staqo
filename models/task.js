const { DataTypes, sequelize } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')
const { sendMail } = require('../utils/node_mailer')

const Task = dbInstance.define('task', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        unique:true
    },

    user_id: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull:false
    },
    description: {
        type: DataTypes.STRING(500)

    },
    start_from: {
        type: DataTypes.DATE
    },
    end_to: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING,
        enum: ["inProgress", "onHold", "closed"],
        default: "inProgress"
    }
})
// Task.sync({alter:true})



module.exports = { Task }