const express = require('express')
const router = express.Router()
const User=require('../../schemas/UserSchema')
const productModel = require('../../schemas/ProductsList')
const res = require('express/lib/response')

//Add to cart
const addToCart = async(req,res) => {
    const { _id,id,quan } = req.body
    try{
        var quantity = quan || 1
        const product = await productModel.findById(id)
        // const user = await User.findById(_id)
        const user = await User.findByIdAndUpdate(_id)
        const userMap = user.Cart.filter((e) => {
            return JSON.stringify(e._id) === product._id
        })
        if (userMap.length > 0){
            if (userMap[0].ProductQuantity !== quantity){
                await User.findOneAndUpdate({'Cart._id':userMap[0]._id},{
                    $set:{
                        'Cart.$.ProductQuantity' : quantity,
                        'Cart.$.SubTotal' : quantity * product.productPrice
                    }
                }).then(()=>{
                    res.send({err:'success'})
                }).catch(e => {
                    res.send({err:null})
                })
            }else{
                res.json({err:null})
            }
        }else{
            user.updateOne({
                $push : {
                    Cart : {
                        _id:product._id,
                        ProductQuantity : quantity,
                        SubTotal : quantity * product.ProductPrice
                    }
                }
            }).then((data) => {
                // console.log(data)
            }).catch(e => {
                res.json({err:null})
            })
        }
    }catch(e){
    }
}
//clear cart
const clearCart = async(req,res) => {
    const { _id } = req.body
    try{
        await User.findByIdAndUpdate(_id,{
            $set:{
                Cart:[]
            }
        }).then((data) => {
            res.send({data})
        }).catch(e => {
            res.send({e})
        })
    }catch(e){
        console.log(e)
    }
}
//cart item array
const getProductArr = async(req,res) => {
    const { _id } = req.body
    const tempArray = []
    const user = await User.findById(_id)
    user.Cart.map(async(e) => {
        const product = await productModel.findById(e._id)
        tempArray.push({
            productId : product._id,
            productImg : product.ProductImage,
            productTitle : product.ProductTitle,
            productPrice : product.ProductPrice,
            quantity : e.ProductQuantity,
            subTotal : e.SubTotal
        })
        if (tempArray.length === user.Cart.length){
            res.json({ tempArray })
        }
    })
}
//inc quantity
const IncQuan = async (req,res) => {
    const { _id,id,quantity } = req.body
    try{
        const product = await productModel.findById(id)
        const user = await User.findByIdAndUpdate(_id)
        await User.findOneAndUpdate({'Cart._id':id},{
            $set:{
                'Cart.$.ProductQuantity' : quantity,
                'Cart.$.SubTotal' : quantity * product.ProductPrice
            }
        }).then(()=>{
            res.send({err:'success'})
        }).catch(e => {
            res.send({err:null})
        })
        // var catRed = user.Cart.map(e => {return e.SubTotal}).reduce((a,b) => {return a+b})
        // console.log(user.Cart,catRed)
    }catch(e){
        res.send({err:null})
    }
}
//wishlist
const wishList = async (req,res) => {}

//temp req
const details = async(req,res) => {
    const {_id} = req.body
    const user = await User.findById(_id)
    res.send({user})
}


router.post('/addToCart',addToCart)
router.post('/clearCart',clearCart)
router.post('/getProductArr',getProductArr)
router.post('/details',details)
router.post('/IncQuan',IncQuan)

module.exports = router