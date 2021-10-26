const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../ultilties/CatchAsync');
const users = require('../controllers/users')

router.get('/register',users.requireRegister)

router.post('/register',catchAsync(users.registerUser))

router.get('/login',users.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout',users.logout)

module.exports = router;