const { body, validationResult } = require('express-validator');
const  jwt = require('jsonwebtoken');
const multer = require('multer');

require('dotenv').config();

module.exports.registerValidations = [
    body('firstName').not().isEmpty().trim().withMessage('First Name is required'),
    body('lastName').not().isEmpty().trim().withMessage('Last Name is required'),
    body('password').isLength({min : 5}).withMessage("password atleast have 5 character"),
    body('cnic').not().isEmpty().trim().withMessage('cnic is required'),
    body('email').not().isEmpty().trim().withMessage('email is required'),
]
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, 'public/uploads')
    },
    filename : (req, file, cb) =>{
        cb(null, file.originalname)
    }
})
module.exports.upload = multer({storage: storage})







