const {createUser,updatedUser,deleteUser, login}= require('../controllers/authController')
const { verifyToken } = require('../middlewares/jwt')
module.exports=(app)=>{
    app.post('/v1/create-User',createUser),
    app.put('/v1/update-User',verifyToken,updatedUser),
    app.delete('/v1/delete-User',deleteUser)
    app.post('/v1/loginUser',login)
}