const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./ultilties/ExpressError');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/user')
const campgroundsRoutes = require('./routes/campground');
const reviewsRoutes = require('./routes/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once("open",() =>{
    console.log('database connected')
})

app.engine('ejs', ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

const sessionConfig={
    secret: 'thisshouldbeasecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next) =>{
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.get('/',(req,res) =>{ 
    res.render('home')
})
app.use('/',userRoutes)
app.use('/campgrounds',campgroundsRoutes)
app.use('/campgrounds/:id/reviews',reviewsRoutes)

app.all('*', (req,res,next) =>{
    next(new ExpressError('Page not found',404))
})

app.use((err,req,res,next) =>{
    const { statusCode = 500, message= 'Something went wrong'} = err;
    if (!err.message) err.message = 'Oh no,Something went wrong!'
   res.status(statusCode).render('error',{ err })
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})