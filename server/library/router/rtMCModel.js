'use strict';

var express=require('express');
var router=express.Router();

var ctrlMCModel=require('../controller/ctrlMCModel');

router.get('/model/:id',function(req,res){
	ctrlMCModel.getAll(function(err,data){
		if (err) res.end(500);
		else res.status(200).end(JSON.stringify(data));
	});
});

module.exports=router;
