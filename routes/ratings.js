//*Handles initial GET request for the homepage


const express = require('express')
const router = express.Router()
const ratingsController = require('../controllers/ratings')
const { ensureAuth, ensureGuest } = require('../middleware/auth') 

router.get('/', ensureAuth, ratingsController.getRatings)


module.exports = router