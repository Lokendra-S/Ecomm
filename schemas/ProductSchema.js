const { numRequired } = require('./schemaType')

const Product = {
    _id : numRequired,
    ProductQuantity : numRequired,
    SubTotal : numRequired
}

module.exports = Product