const express = require('express')

// Setup express router object
const router = express.Router()

// Import auth endpoint??
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')

// Import passport auth functions
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router