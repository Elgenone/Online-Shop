
const mongoose = require('mongoose')

const DB_url = "mongodb+srv://Mahmoud:12345hhh@cluster0.mn2hx.mongodb.net/Onlin-Shop?retryWrites=true&w=majority"
const cardSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount:Number,
    userid: String,
    productid: String,
    timestamp: String
})

const Card = mongoose.model("card", cardSchema)

exports.addcard = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Card.findOne({productid : data.productid,userid:data.userid})   
        }).then(cart => {
            if(!cart){
                let item = new Card(data)
                return item.save()
            }else{
               let amount1 = +data.amount
               let amount2 = +cart.amount
                return Card.updateOne({_id : cart._id},{amount : amount1 + amount2}) 
            }
        })
        .then((carts) =>{
           mongoose.disconnect()
           resolve(carts)
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })


}

exports.getcardbyuserid = (userid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Card.find({userid : userid} ,{} ,{sort : {timestamp : 1}})   
        })
        .then((items) =>{
           mongoose.disconnect()
           resolve(items)
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.EditItem = (itemId , newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Card.updateOne({_id : itemId},newData)   
        })
        .then((items) =>{
           mongoose.disconnect()
           resolve(items)
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.deleteItem = (itemId ) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Card.findByIdAndDelete(itemId)   
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

exports.deleteAllItem = (userid ) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{   
           return Card.deleteMany({userid : userid })
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


exports.getcardbyid = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Card.findByIdAndDelete({_id : id})   
        })
        .then((cart) =>{
           mongoose.disconnect()
           resolve(cart)
        })
        .catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
