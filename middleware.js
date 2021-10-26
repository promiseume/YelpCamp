const { campgroundSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./ultilties/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

//Check if a user is logged in
module.exports.isLoggedIn = (req, res, next) =>{
if(!req.isAuthenticated()){
    //store the url the user is requesting
    req.session.returnTo = req.originalUrl
    req.flash('error','You must be logged in')
    return res.redirect('/login');
  }
  next();
}

module.exports.validateCampground = (req,res,next)=>{
  const { error } = campgroundSchema.validate(req.body);
  if(error){
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg,404)
  }
  else{
      next();
  }
   }
module.exports.isAuthorized = async(req,res,next)=>{
    //check if user is allowed to update the campground
    const {id} = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)){
      req.flash('error','You do not have permission to do that')
     return res.redirect(`/campground/${id}`)
  }
  next();
}

module.exports.validateReview = (req,res,next)=>{
  const { error } = reviewSchema.validate(req.body);
  if(error){
      const msg = error.details.map(el => el.message).join(',')
   throw new ExpressError(msg,404)
  }
  else{
      next();
  }
}

module.exports.isReviewAuthor = async(req,res,next)=>{
  //check if user is allowed to update the campground
  const {id, reviewId} = req.params;
const review = await Review.findById(reviewId);
if (!review.author.equals(req.user._id)){
    req.flash('error','You do not have permission to do that')
   return res.redirect(`/campground/${id}`)
}
next();
}
