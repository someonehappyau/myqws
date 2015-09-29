'use strict';

var express=require('express');
var router=express.Router();

var ctrlImageLib=require('../controller/ctrlImageLib');

router.get('/:imgType/:imgName*',function(req,res){
	ctrlImageLib.getImage(req,res);
});

module.exports=router;
