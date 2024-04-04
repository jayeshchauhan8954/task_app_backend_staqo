const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    _auth:{
        jwtSecretKey:process.env.secretToken
    }
}