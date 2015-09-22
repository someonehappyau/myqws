'use strict';

var pool=require('../../db/dbpool');
//var mysql=require('mysql');

function getOneByModelId(modelId,callback){
	pool.query('select * from MCDrives where model=?',[modelId],callback);
};

module.exports={
	getOneByModelId:getOneByModelId,
};
