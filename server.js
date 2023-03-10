//todo - Declare Variables
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')

//*Import functions/routes
const connectDB = require("./config/database")
const homeRoutes = require("./routes/home")
const editRoutes = require("./routes/edit")
// const ratingRoutes = require("./routes/ratings")

require('dotenv').config({path: './config/.env'})

//todo - Connect to Database
connectDB()

//todo - Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.json())
app.use(logger('dev'))

//Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION}),
    })
)
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//*Required to properly parse form POST requests - sending data
app.use(express.urlencoded({ extended: true }));

//todo - Set Routes
app.use('/', homeRoutes)
// app.use('/ratings', ratingRoutes)
app.use('/edit', editRoutes)

//todo - Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));