const { createTask, getAllTask }=require('../controllers/taksController')
const { verifyToken } = require('../middlewares/jwt')

module.exports=(app)=>{
    app.post('/v1/createTask',verifyToken,createTask)
    app.get('/v1/getAllTask',verifyToken,getAllTask)
}