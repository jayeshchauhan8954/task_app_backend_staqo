const sequelize = require('sequelize')

const dbInstance = new sequelize('task_application', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        operatorAliases: 0,
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const dbConnect = async () => {
    try {
        await dbInstance.authenticate()
        console.log('connnection has been established');
    } catch (error) {
        console.log('unable to connect')
    }
}
module.exports = {
    dbInstance,
    dbConnect
}
