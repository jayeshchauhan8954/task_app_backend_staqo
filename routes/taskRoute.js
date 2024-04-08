const { resetPassword } = require('../controllers/authController')
const { createTask, getAllTask, updateTask,taskGetById, sendMailForFogotPass }=require('../controllers/taksController')
const { verifyToken } = require('../middlewares/jwt')

module.exports=(app)=>{
    app.post('/v1/createTask',verifyToken,createTask)
    app.get('/v1/getAllTask',verifyToken,getAllTask)
    app.put('/v1/updateTask/:id',verifyToken,updateTask)
    app.get('/v1/taskGetById/:id',verifyToken,taskGetById)
    app.post('/v1/resetPassword',verifyToken,resetPassword)
}