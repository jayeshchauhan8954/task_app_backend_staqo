const{ login }=require('../controllers/loginController')
module.exports=(app)=>{
    app.post('/v1/login',login)
}