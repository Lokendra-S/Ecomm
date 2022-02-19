const mongoose = require('mongoose')

const { strRequired,numRequired } = require('./schemaType')

const Products = mongoose.Schema({
    _id : strRequired,
    ProductImage : strRequired,
    ProductTitle : strRequired,
    ProductCategory : strRequired,
    ProductDescription : strRequired,
    ProductPrice : numRequired,
    ProductOriginalPrice: numRequired,
    ProductRating : numRequired,
    ProductRatingCount : numRequired,
})

const productModel = mongoose.model('products',Products)

module.exports = productModel