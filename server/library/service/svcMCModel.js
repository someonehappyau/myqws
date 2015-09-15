'use strict';

var pool=require('../../db/dbpool');
//var mysql=require('mysql');

function getAll(callback){
	pool.query('select * from MCModels',callback);
};

module.exports={
	getAll:getAll,
};
