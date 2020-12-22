
const router = require('express').Router()

const authgard = require('./guards/auth-guard')

const check = require('express-validator').check

const bodyp = require('body-parser')

const bodyparser = bodyp.urlencoded({
    extended: true
})

const ordercontroller = require('../Controller/order-controller')

 router.get("/verfyorder", authgard.isAuth ,
 bodyparser,
 ordercontroller.getverfy)
 {

 }

router.post("/verfyorder",
 authgard.isAuth ,
 bodyparser,
 ordercontroller.getverfy
)
{

}

router.get("/", authgard.isAuth ,
bodyparser,
ordercontroller.getorder)
{

}

router.post("/",
authgard.isAuth ,
bodyparser,
check("address").not().isEmpty().withMessage("Address Is Reqiure"),
ordercontroller.addorder
)
{

}

router.post("/delete",
 authgard.isAuth ,
  bodyparser,
ordercontroller.postdelete)
{

}

router.post("/deleteAll",
 authgard.isAuth ,
  bodyparser,
ordercontroller.postdeleteAll)
{

}



module.exports = router