const {createUser,updatedUser,deleteUser}= require('../controllers/signupController')
module.exports=(app)=>{
    app.post('/v1/createUser',createUser),
    app.put('/v1/updatedUser',updatedUser),
    app.delete('/v1/delete',deleteUser)
}