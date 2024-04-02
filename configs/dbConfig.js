const sequelize = require('sequelize')
const dbInstance = new sequelize('tesk_application', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = dbInstance;