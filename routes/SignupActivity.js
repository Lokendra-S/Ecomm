const express=require('express');
const router=express.Router();
// const loggedin=require('./isLoggedIn');
const User=require('../schemas/UserSchema');

router.get('/signup',(req,res)=>{
    res.render('signup')
});
router.post('/signup',(req,res)=>{
    Users=new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }); 
    var password=req.body.password;
    var cpassword=req.body.cpassword; 
    if (password === cpassword){      
        User.register(Users, password, function(err, user) { 
            if (err) { 
                console.log(err)
            }else{
                res.redirect('/');
                console.log("Success")
            }
        })    
    }else{
        console.log("password mismatch");
        res.redirect('/signup')
    }
});
// router.get('/table',loggedin,(req,res)=>{
//     const user=req.user;
//     User.find({username:user.username},(err,info)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.render('table',{table:info});
//         }
//     })
// });

module.exports=router;