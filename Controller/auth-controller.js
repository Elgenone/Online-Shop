
const authmodel = require("../Models/auth-model")

const validateresult = require('express-validator').validationResult


exports.getsinup = (req,res,next)=>{
        
        res.render("signup",{
            errs : req.flash("valdeationresult"),
            isuser : false,
            isAdmin : false,
            title : "Signup"
        })

}

exports.postsinup = (req,res,next)=>{
        if(validateresult(req).isEmpty()){
        authmodel.
        createNewUser(req.body.name,req.body.email,req.body.password)
        .then(() => res.redirect('/login'))
        .catch((err)=>next(err))
        } else {
            req.flash("valdeationresult" , validateresult(req).array())
            res.redirect("/signup")
        }
}

exports.getlogin = (req,res,next)=>{
 
    res.render("login",{
        autherr : req.flash("autherr")[0],
        errs : req.flash("Loginvaldeationresult" ),
        isuser : false,
        isAdmin : false,
        title : "Login"


    })
}

exports.postlogin = (req,res,next)=>{
    if(validateresult(req).isEmpty()){
        authmodel.login(req.body.email,req.body.password)
        .then(result => {
            req.session.userId = result.id
            req.session.isAdmin = result.isAdmin
            res.redirect('/')
        })
        .catch((err)=>{
           req.flash("autherr",err)
           next(err)
        })
    }else {
        req.flash("Loginvaldeationresult" , validateresult(req).array())
        res.redirect('/login')
    }

}

exports.logout = (req,res,next)=>{

    req.session.destroy(()=>{
        res.redirect('/login')
    })
}