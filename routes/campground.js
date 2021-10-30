const express = require('express');
const router = express.Router();
const catchAsync = require('../ultilties/CatchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthorized,validateCampground } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/',catchAsync(campgrounds.index))
 
 router.get('/new', isLoggedIn,campgrounds.renderNewForm)
 
 router.post('/',isLoggedIn,upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
 
 router.get('/:id', catchAsync(campgrounds.showCampground));
 
 router.get('/:id/edit',isLoggedIn, isAuthorized, catchAsync(campgrounds.editCampground));
 
 router.put('/:id',isLoggedIn,isAuthorized,upload.array('image'), validateCampground ,catchAsync(campgrounds.updateCampground))

 router.delete('/:id',isAuthorized, catchAsync(campgrounds.deleteCampground))
 
 module.exports = router;
 