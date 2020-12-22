
const productmodel = require("../Models/products-model")

exports.gethome = (req,res,next)=>{
    //get products
    //render index.js

    let categore = req.query.category
    let valiedcategory = ['animal','womans','travel']

    if(categore && valiedcategory.includes(categore))
    {
        productmodel.getallproductsbycategory(categore).then(products => {
        
            res.render("index",{
                products : products,
                isuser : req.session.userId,
                isAdmin : req.session.isAdmin,
                title : "Home",
                err : req.flash("valdeationerrors" )[0]
            })
    
        }).catch((err) => next(err))
    } else{
        productmodel.getallproducts().then(products => {
        
            res.render("index",{
                products : products,
                isuser : req.session.userId,
                isAdmin : req.session.isAdmin,
                title : "Home",
                err : req.flash("valdeationerrors" )[0]
            })
    
        }).catch((err) => next(err))
    }
}