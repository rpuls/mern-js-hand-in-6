const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const logger = require('morgan')
const api = require("./api/api")
const path = require('path')
const helmet = require('helmet')
const secret = require('./models/secrets')
const expressJWT = require('express-jwt')
app.set("json spaces", 2)
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}))
app.use(helmet.frameguard({ action: 'sameorigin' }))
/* Not yet implemented in frontend.
app.use(express.csrf())
app.use((req,res,next)=>{
  res.locals.csrftoken = req.csrfToken()
  next()
})*/
app.use(expressJWT({secret: secret}).unless({path : ['/login','/books', '/user']}))

app.use("/", function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader("Content-Type", "application/json")
  next()
})
app.use("/", api)

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  console.error(err.status)
  res.status(err.status || 500)
  res.json({ msg: err.message, status: err.status })
})

//Call this to initialize mongoose
function initMongoose(dbConnection) {
  require("./db/mongooseConnect")(dbConnection)
}

app.initMongoose = initMongoose

module.exports = app


