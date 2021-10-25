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