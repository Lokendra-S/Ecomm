require('dotenv').config()
require('./routes/MongooseConnection')
const express = require('express')
const app = express()
const path = require('path')
const passport=require('passport');
const session=require('express-session');

const PORT = 4000


const User=require('./schemas/UserSchema')
const productModel = require('./schemas/ProductsList')
const loginUser = require('./routes/LoginActivity')
const signupUser = require('./routes/SignupActivity')
const isLoggedIn = require('./routes/isLoggedin')
const shopQuery = require('./routes/AJAX/Shop')

app.set('view engine','ejs')
app.set('views',path.join(__dirname+'/views'))

app.use(express.static(__dirname+'/static'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(loginUser)
app.use(signupUser)
app.use(shopQuery)

app.get('/',(req,res) => {
    res.render('Home.ejs')
})
app.get('/shop',(req,res) => {
    const product = productModel.find()
    product.then((data) => {
        res.render('Shop.ejs',{products : data})
    }).catch(e => {
        console.log(e)
    })
})
app.get('/shop-item',(req,res) => {
    res.render('ShopItem.ejs')
})
app.get('/:name&:id',(req,res) => {
    const productName = req.params.name
    const productId = req.params.id
    const product = productModel.findOne({"_id" : productId})
    if (product){
        product.then((data) => {
            if ( data === null ){
                res.redirect('/')
            }
            res.render('ShopItem.ejs',{productData : data})
        }).catch((e) => {
            res.redirect(`/`)
        })
    }
})
app.get('/cart', async(req,res) => {
    res.render('Cart.ejs')
})
app.get('/check-out',isLoggedIn,(req,res) => {
    res.render('Checkout.ejs')
})
app.get('/profile',isLoggedIn,(req,res) => {
    res.render('Profile.ejs')
})


app.get('/product',(req,res)=>{
    const product = productModel.find()
    product.then((data) => {
        res.json({
            dataItems : JSON.stringify(data[1])
        })
    }).catch(e => {
        console.log(e)
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})