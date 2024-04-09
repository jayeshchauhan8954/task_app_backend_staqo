const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")

const serverConfig = require("./configs/serverConfig")

app.use(bodyParser.json())
app.use(cors())

const db = require('./configs/dbConfig')
db.dbConnect()



require('./routes/authRoute')(app)
require('./routes/taskRoute')(app)

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running up and down by PORT: ${serverConfig.PORT}`);
})