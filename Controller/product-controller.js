
const productmodel = require("../Models/products-model")

exports.getproduct = (req,res,next)=>{

    let id = req.params.id
    productmodel.getallproductsbyid(id).then(product => {
        
        res.render("product",{
            product : product,
            isuser : req.session.userId,
            title : "Product",
            isAdmin : req.session.isAdmin,
        })

    }).catch((err) => next(err))

}

exports.getproductone = (req,res,next)=>{
    productmodel.getfirstproduct().then(product => {
        
        res.render("product",{
            product : product,
            isuser : req.session.userId,
            isAdmin : req.session.isAdmin,
            title : "Product"
        })

    }).catch((err) => next(err))
}
