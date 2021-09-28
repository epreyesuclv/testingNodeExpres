const { request } = require("express")
const express = require("express");
const { fetchFromAllNodes } = require("./fetchData/requestData");
const { frontRegister, frontLogin, backRegister, backLogin } = require("./jwt/middleware/auth");

//database connection
require("dotenv").config()
//require("./jwt/config/databaseQuerys").connect();
require("./models/connection").sequelize.sync()

//port config
const { API_PORT } = process.env
const port = API_PORT || 4001


//server
const app = express()


//midalwares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// rutas
app.use(require("./frontBuisness/APIroot/index"))
app.post("/back_register", backRegister)
app.post("/back_login", backLogin)
app.post("/front_register", frontRegister)
app.post("/front_login", frontLogin)

//runserver
app.listen(port, () => {
    console.log('server is runnig on port ' + port)
        fetchFromAllNodes()
})