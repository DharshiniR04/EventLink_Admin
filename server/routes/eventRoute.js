const express=require('express');
const {addEvent,addEventDetail,getPlannedEvent,editEvent,deleteEvent} =require('../controller/eventController')
const router=express.Router();

router.post('/addevent',addEvent);
router.post('/addeventdetail',addEventDetail);
router.get('/getPlannedEvent',getPlannedEvent);
router.patch('/editEvent',editEvent);
router.delete('/deleteEvent',deleteEvent);

module.exports=router;