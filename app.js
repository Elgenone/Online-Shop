
const exp = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const Sessionstore = require('connect-mongodb-session')(session)

const homerouter = require("./Routs/home-route")
const productrouter = require("./Routs/product-route")
const authrouter = require("./Routs/auth-route")
const cardrouter = require("./Routs/card-route")
const orderrouter = require("./Routs/order-route")
const adminrouter = require("./Routs/admin-route")
const { error } = require('console')



const STORE = new Sessionstore({
    uri : "mongodb+srv://Mahmoud:12345hhh@cluster0.mn2hx.mongodb.net/Onlin-Shop?retryWrites=true&w=majority",
    collection : "sessions"
})

const statics = exp.static(path.join(__dirname, "assets"))
const images = exp.static(path.join(__dirname, "images"))
const app = exp()
app.set('view engine', 'ejs')
app.use(statics)
app.use(images)

app.use(flash())
app.use(session({
    secret : "this is my secret no one can now it HHHHHHH",
    saveUninitialized : false,
    //cookie : {
        //maxAge: 1*60*60*100
    //},
    store : STORE,
    resave:true
}))
app.use('/', homerouter)
app.use('/product',productrouter)
app.use('/', authrouter)
app.use('/card',cardrouter)
app.use('/order',orderrouter)
app.use('/admin',adminrouter)

app.get("/error",(req,res,next) => {
    res.status(500) // status is internal error
    res.render("error.ejs",{
        isuser : req.session.userId,
        isAdmin : req.session.isAdmin,
        title :"Error"
    })
})

app.use((error,req,res,next) => {
    res.redirect("/error")
 })

app.get("/not-admin",(req,res,next) => {
    res.status(403) // status is not allowed
    res.render("not-admin.ejs",{
        isuser : req.session.userId,
        isAdmin : false,
        title :"Not Allowed"
    })
})


app.get((req,res,next) => {
    res.status(404).json({ errors }) // status is not found
    res.render("not-found.ejs",{
        isuser : req.session.userId,
        isAdmin : req.session.isAdmin,
        title :"Not Found"
    })
})


const port = process.env.PORT || 3000 // the port to link to heroku server

app.listen(port, () =>{ console.log(`Server is Listen on port ${port}`) })