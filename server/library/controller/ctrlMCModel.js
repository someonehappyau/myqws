'use strict';

var async=require('async');

var util=require('../../util/util');

var svcMCModel=require('../service/svcMCModel');
var svcMCEngine=require('../service/svcMCEngine');
var svcMCFrame=require('../service/svcMCFrame');
var svcMCSuspension=require('../service/svcMCSuspension');
var svcMCBrake=require('../service/svcMCBrake');
var svcMCWheel=require('../service/svcMCWheel');
var svcMCDimension=require('../service/svcMCDimension');
var svcMCDrive=require('../service/svcMCDrive');

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
		else{ 
			if (!!data){
				var modelId=data.id;
				var engine=false,
					frame=false,
					suspension=false,
					brake=false,
					wheel=false,
					dimension=false,
					drive=false,
					gallery=false;

				async.parallel([
					function(cb){
						svcMCEngine.getOneByModelId(modelId,function(err,result){
							if (!err) 
								engine=result;
							cb();
						});
					},
					function(cb){
						svcMCFrame.getOneByModelId(modelId,function(err,result){
							if (!err) 
								frame=result;
							cb();
						});
					},
					function(cb){
						svcMCSuspension.getOneByModelId(modelId,function(err,result){
							if (!err) 
								suspension=result;
							cb();
						});
					},
					function(cb){
						svcMCBrake.getOneByModelId(modelId,function(err,result){
							if (!err) 
								brake=result;
							cb();
						});
					},
					function(cb){
						svcMCWheel.getOneByModelId(modelId,function(err,result){
							if (!err) 
								wheel=result;
							cb();
						});
					},
					function(cb){
						svcMCDimension.getOneByModelId(modelId,function(err,result){
							if (!err) 
								dimension=result;
							cb();
						});
					},
					function(cb){
						svcMCDrive.getOneByModelId(modelId,function(err,result){
							if (!err) 
								drive=result;
							cb();
						});
					},
					function(cb){
						svcMCModel.getGalleryById(modelId,function(err,result){
							if (!err) 
								gallery=result;
							cb();
						});
					}],
					function(err){
						if (err)
							res.status(500).end(util.toResponse(-1,err));
						else
							res.status(200).end(util.toResponse(0,{
								model:data,
								engine:engine,
								frame:frame,
								suspension:suspension,
								brake:brake,
								wheel:wheel,
								dimension:dimension,
								drive:drive,
								gallery:gallery
							}));
					});
			}
			else
				res.status(200).end(util.toResponse(0,data));
		}
	});
};

module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
};
