'use strict';

var svcMCModel=require('../service/svcMCModel');

function getAll(callback){
	svcMCModel.getAll(callback);
};

module.exports={
	getAll:getAll,
};
