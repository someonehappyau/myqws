'use strict';

var svcMCModel=require('../service/svcMCModel');

function getAll(callback){
	svcMCModel.getAll(callback);
};

function getAllByBrandName(brandName,callback){
	svcMCModel.getAllByBrandName(brandName,callback);
};

function getOneByNameAndYear(modelName,yearStart,yearEnd,callback){
	svcMCModel.getOneByNameAndYear(modelName,yearStart,yearEnd,callback);
};

module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
};
