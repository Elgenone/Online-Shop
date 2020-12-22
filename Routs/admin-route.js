const router = require('express').Router()

const bodyp = require('body-parser')

const bodyparser = bodyp.urlencoded({
    extended: true
})


const multer = require('multer')

const check = require('express-validator').check


const admingard = require('./guards/admin-guard')


const admincontroller = require('../Controller/admin-controller')

router.get("/add",
admingard,
admincontroller.getadd
)

router.post("/add",
admingard,
multer({
    //dest:"images" // the folder that saved the file in = destination
    storage : multer.diskStorage({
        destination : (req,file,cb) => {
            cb(null,"images")
        },
        filename : (req , file , cb) => {
            cb(null , Date.now + "-" + file.originalname)

        }
    })
}).single("image"),
check("image").custom((value,{req}) => {
    if (req.file) return true
    else throw "Image is Reqiured"
}),
check('name').not().isEmpty().withMessage("User Name Is Reqiure"),
check('price').not().isEmpty().withMessage("Price Is Reqiure"),
check('description').not().isEmpty().withMessage("Description Is Reqiure"),
admincontroller.postadd
)

router.get("/manage",
admingard,
admincontroller.getmanage
)

router.post("/save",
admingard ,
  bodyparser,
admincontroller.postsave)
{

}

module.exports = router