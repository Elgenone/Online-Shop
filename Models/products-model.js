
const mongoose = require('mongoose')

const DB_url = "mongodb+srv://Mahmoud:12345hhh@cluster0.mn2hx.mongodb.net/Onlin-Shop?retryWrites=true&w=majority"

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    categore: String,
    description: String,
    image: String
})

const Product = mongoose.model("proudct", productSchema)

exports.addproduct = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
                let item = new Product(data)
                return item.save()   
        })
        .then(() =>{
           mongoose.disconnect()
           resolve()
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getallproducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true}).then(() => {
            return Product.find({
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })

    })


}

exports.getallproductsbycategory = (categore) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true}).then(() => {
            return Product.find({
                categore : categore
            }).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })

    })


}

exports.getallproductsbyid = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true}).then(() => {
            return Product.findById(id).then(products => {
                mongoose.disconnect()
                resolve(products)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })

    })


}

exports.getfirstproduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true}).then(() => {
            return Product.findOne().then(product => {
                mongoose.disconnect()
                resolve(product)
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })

    })


}