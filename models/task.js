const { DataTypes, sequelize } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')

const Task = dbInstance.define('task', {
    user_id: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    start_from: {
        type: DataTypes.STRING
    },
    end_to: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        enum: ["inProgress", "onHold", "closed"],
        default:"inProgress"
    }
})
Task.sync()

module.exports = {
    Task
}