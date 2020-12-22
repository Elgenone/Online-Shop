
const router = require('express').Router()

const authgard = require('./guards/auth-guard')

const check = require('express-validator').check

const bodyp = require('body-parser')

const bodyparser = bodyp.urlencoded({
    extended: true
})

const cardcontroller = require('../Controller/card-controller')

router.get("/", authgard.isAuth , cardcontroller.getcard)
{

}

router.post("/",
 authgard.isAuth ,
  bodyparser,
check("amount").not().isEmpty().withMessage("Amount Is Reqiure")
.isInt({ min: 1 }).withMessage("Amount Must be greater than (0)"),
cardcontroller.postcard)
{

}

router.post("/save",
 authgard.isAuth ,
  bodyparser,
check("amount").not().isEmpty().withMessage("Amount Is Reqiure")
.isInt({ min: 1 }).withMessage("Amount Must be greater than (0)"),
cardcontroller.postsave)
{

}

router.post("/delete",
 authgard.isAuth ,
  bodyparser,
cardcontroller.postdelete)
{

}

router.post("/deleteAll",
 authgard.isAuth ,
  bodyparser,
cardcontroller.postdeleteAll)
{

}



module.exports = router