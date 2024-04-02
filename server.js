const express=require("express")
const app=express()

const bodyParser=require("body-parser")
app.use(bodyParser.json())

const cors=require("cors")
const serverConfig = require("./configs/serverConfig")
app.use(cors())

app.listen(serverConfig.PORT,()=>{
    console.log(`Server is running up and down by PORT: ${serverConfig.PORT}`);
})