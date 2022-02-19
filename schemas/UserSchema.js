const mongoose = require('mongoose')
const passpoer_local_mongoose=require('passport-local-mongoose');
const { strRequired,numRequired } = require('./schemaType')
const { Product } = require('./ProductSchema')

const UserSchema = mongoose.Schema({
    firstName : strRequired,
    lastName : strRequired,
    username : strRequired,
    email : strRequired,
    password : strRequired,
    
    Favourites : [{
        _id : numRequired
    }],
    Cart :
        [{
        _id : numRequired,
        ProductQuantity : numRequired,
        SubTotal : numRequired
        }]    
    ,
    Orders : [{
        _id : numRequired,
        ProductQuantity : numRequired,
        SubTotal : numRequired
    }]
})

UserSchema.plugin(passpoer_local_mongoose);

const User = mongoose.model('Ecom',UserSchema)
module.exports = User
