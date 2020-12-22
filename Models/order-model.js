
const mongoose = require('mongoose')

const DB_url = "mongodb+srv://Mahmoud:12345hhh@cluster0.mn2hx.mongodb.net/Onlin-Shop?retryWrites=true&w=majority"
const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount:Number,
    userid: String,
    productid: String,
    address :String,
    status : String,
    timestamp: String
})

const Order = mongoose.model("order", orderSchema)


exports.addorder = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
                let item = new Order(data)
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

exports.getorderbyuserid = (userid) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Order.find({userid : userid} ,{} ,{sort : {timestamp : 1}})   
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
           return Order.findByIdAndDelete(itemId)   
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
           return Order.deleteMany({userid : userid })   
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

exports.getallorders = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
           return Order.find({})   
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
           return Order.updateOne({_id : itemId},newData)   
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

// exports.orderall = (userid ) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
//         .then(()=>{
//            return Card.find({userid : userid })   
//         })
//         .then((items) =>{
//             let item = new Order(items)
//                 return item.save()  
//         }).then(() =>{
//            Card.deleteMany({userid : userid })
//            mongoose.disconnect()
//            resolve(items)
//         })
//         .catch((err) => {
//             mongoose.disconnect()
//             reject(err)
//         })
//     })
// }