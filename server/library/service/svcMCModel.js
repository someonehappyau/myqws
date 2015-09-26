'use strict';

var pool=require('../../db/dbpool');
//var mysql=require('mysql');

function getAll(callback){
	pool.query('select * from MCModels',callback);
};

function getAllByBrandName(brandName,callback){
	pool.query('select * from MCMaker where label=?',[brandName],function(err,rows){
		if (err)
			callback(err,null);
		else if (rows.length<=0)
			callback(new Error(brandName+' not found'),null);
		else
			pool.query('select * from MCModels where makerLabel=?',[brandName],callback);
	});
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

function getGalleryById(modelId,callback){
	pool.query('select * from MCGalleries where model=? and state=2 order by position',[modelId],callback);
};

module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
	getGalleryById:getGalleryById,
};
