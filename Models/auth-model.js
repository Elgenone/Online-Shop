
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const DB_url = "mongodb+srv://Mahmoud:12345hhh@cluster0.mn2hx.mongodb.net/Onlin-Shop?retryWrites=true&w=majority"

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default : false,
    }
})

const User = mongoose.model("user", userSchema)

exports.login = (email,password) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true})
        .then(()=>{
          return  User.findOne({email : email})
        })
        .then(user=>{
            if(!user) {
                mongoose.disconnect()
                reject('Email is Not Found')
            } else{
               bcrypt.compare(password,user.password)
               .then(same =>{
                    if(!same) {
                        mongoose.disconnect()
                        reject('The Password is Not corect')
                    }else{
                        mongoose.disconnect()
                        resolve({
                            id : user._id,
                            isAdmin : user.isAdmin
                        })
                    }
                })
            }
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })

    })
}

exports.createNewUser = (name,email,password) =>{


    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url,{ useUnifiedTopology: true , useNewUrlParser: true}).then(()=>{
            return User.findOne({email : email})
            .then(user=>{
                if(user) {
                    mongoose.disconnect()
                    reject('Email is Used Before')
                }
                else{
                   return bcrypt.hash(password,10)

                }
            }).then(hashedpass =>{
                let user = new User({
                    name : name,
                    email : email,
                    password : hashedpass
                })
               return user.save()
            }).then(() =>{
                mongoose.disconnect()
               resolve()
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })   
}