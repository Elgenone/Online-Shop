
const ordermodel = require("../Models/order-model")

const cardmodel = require("../Models/card-model")


const validateresult = require('express-validator').validationResult

exports.getorder = (req,res,next)=>{
    
    ordermodel.getorderbyuserid(req.session.userId).then(items=>{
        res.render("order",{

            items : items ,
            isuser : true,
            title : "Orders",
            isAdmin : req.session.isAdmin,
    
        })

    }).catch((err) => next(err))
    
}

exports.getverfy= (req,res,next)=>{
    
    cardmodel.getcardbyid(req.body.cardid).then(cart=>{
        res.render("verfyorder",{

            cart : cart ,
            err : req.flash("valdeationerrors")[0] ,
            isuser : true,
            isAdmin : req.session.isAdmin,
            title : "Verfy Order",

    
        })

    }).catch((err) => next(err))
    
}


exports.addorder = (req,res,next)=>{
    if(validateresult(req).isEmpty()){
        const{name,price,amount,productid,address} = req.body
    ordermodel
    .addorder({
        name :name,
        price :price,
        amount : amount,
        productid : productid,
        address :  address, 
        userid :req.session.userId, 
        status :  "Pending",
        timestamp : Date.now()
    })
    .then(() => res.redirect('/order'))
    .catch((err) => next(err))
    } else {
        req.flash("valdeationerrors" , validateresult(req).array())
        res.redirect("/order/verfyorder")
    }
}

exports.postdelete = (req,res,next)=>{
    
    ordermodel
    .deleteItem(req.body.orderid)
    .then(() => res.redirect('/order'))
    .catch((err) => next(err))
       
}

exports.postdeleteAll = (req,res,next)=>{
    
    ordermodel
    .deleteAllItem(req.session.userId)
    .then(() => res.redirect('/order'))
    .catch((err) => next(err))
       
}

