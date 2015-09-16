'use strict';

var pool=require('../../db/dbpool');
//var mysql=require('mysql');

function getAll(callback){
	pool.query('select * from MCModels',callback);
};

function getAllByBrandName(brandName,callback){
	pool.query('select * from MCModels where makerLabel=?',[brandName],callback);
};

function getOneByNameAndYear(modelName,yearStart,yearEnd,callback){
	pool.query('select * from MCModels where label=? and yearStart=? and yearEnd=?',[modelName,yearStart,yearEnd],function(err,data){
		if (err)
			callback(err,null);
		else if(!data)
			callback(null,false);
		else if(data.length>=1)
			callback(null,data[0]);
		else
			callback(null,false);
	});
};

module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
};
