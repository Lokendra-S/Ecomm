const express=require('express');
const router=express.Router();
const passport=require('passport');

router.get('/login',(req,res)=>{
    res.render('login',{success: true})
});
router.post("/login",
    function (req, res) {
        if(!req.body.username){
            res.render('login',{success: false, message: "Username was not given"})
        } else {
            if(!req.body.password){
                res.render('login',{success: false, message: "Password was not given"})
            }else{
            passport.authenticate('local', function (err, user, info) { 
                if(err){
                    res.json({success: false, message: err})
                } else{
                    if (! user) {
                        res.render('login',{success: false, message: 'username or password incorrect'})
                    } else{
                        req.login(user, function(err){
                            if(err){
                                res.render('login',{success: false, message: 'Network error'})
                            }else{
                                // res.json({success:true, message:"Authentication successful"});
                                res.redirect('/')
                                console.log("Login Successful");
                            }
                        })
                    }
                }
            })(req, res);
        }
    }
});

module.exports=router;