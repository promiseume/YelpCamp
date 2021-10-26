const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../ultilties/CatchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../ultilties/ExpressError');
const { reviewSchema } = require('../schemas.js');
const reviews = require('../controllers/reviews')
const {validateReview, isLoggedIn,isReviewAuthor} = require('../middleware')

router.post('/',validateReview,isLoggedIn, catchAsync(reviews.addReview))
  
  router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

  module.exports = router;