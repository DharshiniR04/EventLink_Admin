const express=require('express');
const {updateUserDetail,deleteUser,fetchuser,userdetail} =require('../controller/userController')
const router=express.Router();

router.patch('/updateUserDetail',updateUserDetail);
router.post('/deleteUser',deleteUser);
router.post('/fetchuser',fetchuser);
router.patch('/userdetail',userdetail);


module.exports=router;