
// imports express frameworks to handle backend api routes / responses / middleware/ and run HTTP(s) server
const express = require('express')

// Instantiate the main express function/object
const app = express()

// Imports mongoose module. Mongoose is an ODM (Object Database Modeling) library that allows you to model database schemas in application logic and interface with MongoDB databases
const mongoose = require('mongoose')

// Import for Passport.JS which is a middleware module for Node.js that handles authentication and authorization via module strategies
const passport = require('passport')

// Import for express-session middleware module. Express-session saves session on the server side and uses a client-side cookie to store the session ID
const session = require('express-session')

// Import for connect-mongo. It is an express.js middleware to store used store session data in a MongoDB database
const MongoStore = require('connect-mongo')(session)

// Import for express-flash module which is an extension to render popup messages
const flash = require('express-flash')

// Import for morgan module which is an HTTP request logger for Node.js
const logger = require('morgan')

// Import database connection object
const connectDB = require('./config/database')

// Imports router object for the main routes "/"
const mainRoutes = require('./routes/main')

// Import todo routes
const todoRoutes = require('./routes/todos')

// Import edit routes
const editRoutes = require('./routes/edit')

// Imports the dotenv module, which is a zero dependency module that loads environment variables from a .env file
//then runs the config method which loads environment variables from the provided .env file
require('dotenv').config({path: './config/.env'})

// Passport config
// Import local passport config function/object

// Then "passport MAGIC"
require('./config/passport')(passport)

// Execute database connection
connectDB()

// Enable ejs template engine
app.set('view engine', 'ejs')

// Servers static files from the provided path
app.use(express.static('public'))

// Middleware function to parse url encoded data from request
//urlencoded "Extended" syntac allows rich objects allowing for a JSON-like experience with URL encoded data
app.use(express.urlencoded({ extended: true }))

// Middleware function to parse JSON data from request
app.use(express.json())

// Enable morgan middleware with "dev" test
app.use(logger('dev'))

// Sessions

// Enable and configure express session middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Enable flash middleware
app.use(flash())
 
// Enable express routes
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
app.use('/edit', editRoutes)
 
// Listen for requests to the provided PORT
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    