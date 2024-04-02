const dbInstance=require('../configs/dbConfig')
const {sequelize,DataTypes}=require('sequelize')

const User= dbInstance.define('user',{
    userName:{
        type:DataTypes.STRING,
        alowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        alowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.INTEGER,
        alowNull:false

    },
    status: {
        type: sequelize.STRING,
        defaultValue: 'active'
    }
})

module.exports=User