

const validateresult = require('express-validator').validationResult

const ordermodel = require("../Models/order-model")

const productmodel = require("../Models/products-model")





exports.getadd = (req,res,next)=>{
        
    res.render("add-product",{
        errs : req.flash("valdeationerrors"),
        isuser : true,
        isAdmin : true,
        title : "Add Product"
    })
}


exports.postadd = (req,res,next)=>{
    //req.body
    //req.file.filename
    if(validateresult(req).isEmpty()){
        const{name,price,category,description} = req.body
    productmodel
    .addproduct({
        name :name,
        price :price,
        categore:category,
        description:description,
        image:req.file.filename
    })
    .then(() => res.redirect('/'))
    .catch((err) => 
    //res.redirect('/error') // use this rout direct without go to error middelware
      next(err) // using middelware error in app.js
    )
    } else {
        req.flash("valdeationerrors" , validateresult(req).array())
        res.redirect("/admin/add")
    }

}

exports.getmanage = (req,res,next)=>{
     
    ordermodel.getallorders().then(orders => {

        res.render("admin-manage",{
            isuser : true,
            isAdmin : true,
            items : orders,
            title : "Mange Order",
        })

    }).catch((err) => next(err) )
    
}

exports.postsave = (req,res,next)=>{
    ordermodel
    .EditItem(req.body.orderid,{status : req.body.status})
    .then(() => res.redirect('/admin/manage'))
    .catch((err) => next(err))
    
}

