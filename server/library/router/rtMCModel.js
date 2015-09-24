'use strict';

var express=require('express');
var router=express.Router();

var ctrlMCModel=require('../controller/ctrlMCModel');

router.get('/model/brand/:brandName',function(req,res){
	ctrlMCModel.getAllByBrandName(req,res);
});

router.get('/model/:modelName',function(req,res){
	ctrlMCModel.getOneByNameAndYear(req,res);
});

router.get('/model/specs/:modelName',function(req,res){
	ctrlMCModel.getOneSpecsByNameAndYear(req,res);
});

module.exports=router;
