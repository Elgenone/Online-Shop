const cardmodel = require("../Models/card-model")

const validateresult = require('express-validator').validationResult

exports.getcard = (req,res,next)=>{
    
    cardmodel.getcardbyuserid(req.session.userId).then(items=>{
        res.render("card",{

            items : items ,
            err : req.flash("valdeationerrors")[0] ,
            isuser : true,
            isAdmin : req.session.isAdmin,
            title : "Cart",
    
        })

    }).catch((err) => next(err))
    
}



exports.postcard = (req,res,next)=>{
    if(validateresult(req).isEmpty()){
    cardmodel
    .addcard({
        name :req.body.name,
        price :req.body.price,
        amount : req.body.amount,
        userid : req.session.userId,
        productid : req.body.productid,       
        timestamp : Date.now()
    })
    .then(() => res.redirect('/card'))
    .catch((err) => next(err))
    } else {
        req.flash("valdeationerrors" , validateresult(req).array())
        res.redirect(req.body.redirect)
    }
}

exports.postsave = (req,res,next)=>{
    if(validateresult(req).isEmpty()){
    cardmodel
    .EditItem(req.body.cardid,{amount : req.body.amount , timestamp : Date.now()})
    .then(() => res.redirect('/card'))
    .catch((err) => next(err))
    } else {
        req.flash("valdeationerrors" , validateresult(req).array())
        res.redirect('/card')
    }
}

exports.postdelete = (req,res,next)=>{
    
    cardmodel
    .deleteItem(req.body.cardid)
    .then(() => res.redirect('/card'))
    .catch((err) => next(err))
       
}

exports.postdeleteAll = (req,res,next)=>{
    
    cardmodel
    .deleteAllItem(req.session.userId)
    .then(() => res.redirect('/card'))
    .catch((err) => next(err))
       
}