const express=require('express');
const {login,passwordRecovery} =require('../controller/authController')
const router=express.Router();

router.post('/login',login);
router.get('/passwordRecovery',passwordRecovery);

module.exports=router;