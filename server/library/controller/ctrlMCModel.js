'use strict';

var util=require('../../util/util');

var svcMCModel=require('../service/svcMCModel');

function getAll(callback){
	svcMCModel.getAll(callback);
};

function getAllByBrandName(req,res){
	svcMCModel.getAllByBrandName(req.params.brandName,function(err,data){
		if (err) 
			res.status(500).end(util.toResponse(-1,err));
		else 
			res.status(200).end(util.toResponse(0,data));
	});
};

function getOneByNameAndYear(req,res){
	svcMCModel.getOneByNameAndYear(req.params.modelName,req.query.yearStart,req.query.yearEnd,function(err,data){
		if (err) 
			res.status(500).end(util.toResponse(-1,err));
		else 
			res.status(200).end(util.toResponse(0,data));
	});
};

module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
};
