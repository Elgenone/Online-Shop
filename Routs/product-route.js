
const router = require('express').Router()
const productcontroller = require('../Controller/product-controller')

router.get("/",productcontroller.getproductone)

router.get("/:id",productcontroller.getproduct)

module.exports = router
