
const router = require('express').Router()

const authgard = require('./guards/auth-guard')

const homecontroller = require('../Controller/home-controller')

router.get("/",
homecontroller.gethome
)

module.exports = router