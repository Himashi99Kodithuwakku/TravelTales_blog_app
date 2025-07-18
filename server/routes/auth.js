const express = require('express');
const router = express.Router();
const {userRegister,userLogin,sendEmail,verifyResetCode,resetPassword,getUsername}  = require('../controllers/auth_controller');


router.post('/userRegister',userRegister);
router.post('/userLogin',userLogin);
router.post('/forgotpwd',sendEmail);
router.post('/verifyCode',verifyResetCode);
router.post('/resetPassword',resetPassword);
router.get('/getUsername/:id',getUsername);

module.exports= router;
