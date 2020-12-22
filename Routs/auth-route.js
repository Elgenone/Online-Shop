
const router = require('express').Router()

const bodyp = require('body-parser')

const authgard = require('./guards/auth-guard')

const check = require('express-validator').check

const bodyparser = bodyp.urlencoded({
    extended: true
})

const authcontroller = require('../Controller/auth-controller')

router.get("/signup", authgard.notAuth , authcontroller.getsinup)
{

}

router.post(
    "/signup", authgard.notAuth ,
    bodyparser,
    check('name').not().isEmpty().withMessage("User Name Is Reqiure"),
    check('email').not().isEmpty().withMessage("Email Is Reqiure").isEmail().withMessage("Invaled Email"),
    check('password').not().isEmpty().withMessage("Password Is Reqiure")
    .isLength({min:6}).withMessage("Password Must be at least 6 Characters"),
    //(req,res,next)=>{
         // let value =req.body.confirmpassword
        // return check('confirmpassword').equals(value).withMessage("Password Not Equal The Confirm Password")
    //},
    check('confirmpassword').custom((value,{req})=>{
           if(value == req.body.password) return true
           else throw "Password Not Match The Confirm Password"
   }),
    authcontroller.postsinup
)
{
    
}

router.get("/login", authgard.notAuth ,authcontroller.getlogin)
{
    
}
router.post("/login", authgard.notAuth ,
bodyparser,
check('email').not().isEmpty().withMessage("Email Is Reqiure").isEmail().withMessage("Invaled Email"),
check('password').not().isEmpty().withMessage("Password Is Reqiure"),
authcontroller.postlogin)
{
    
}
router.all("/logout", authgard.isAuth ,authcontroller.logout)

module.exports = router