'use strict';

var express=require('express');
var router=express.Router();

var ctrlMCModel=require('../controller/ctrlMCModel');

router.get('/model/brand/:brandName',function(req,res){
	ctrlMCModel.getAllByBrandName(req.params.brandName,function(err,data){
		if (err) res.end(500);
		else res.status(200).end(JSON.stringify(data));
	});
});

router.get('/model/:modelName',function(req,res){
	ctrlMCModel.getOneByNameAndYear(req.params.modelName,req.query.y1,req.query.y2,function(err,data){
		if (err) res.end(500);
		else res.status(200).end(JSON.stringify(data));
	});
});

module.exports=router;
