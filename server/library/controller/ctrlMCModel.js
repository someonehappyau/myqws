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


function getOneSpecsByNameAndYear(req,res){
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
						else{
							var d={
									model:data,
									engine:engine,
									frame:frame,
									suspension:suspension,
									brake:brake,
									wheel:wheel,
									dimension:dimension,
									drive:drive,
									gallery:gallery
								};

							var ret=composeModelSpecs(d);

							res.status(200).end(util.toResponse(0,{model:data,gallery:gallery,specs:ret}));
						}
					});
			}
			else
				res.status(200).end(util.toResponse(0,data));
		}
	});
};


function composeModelSpecs(data){
	var ret=[];

	//console.log(data);

	if (data.engine.length>0){
		var eng=data.engine[0];
		var engContent=[];

		pushItem(engContent,'形式',eng.engTypeLabel+' '+eng.engCoolingLabel+' '+eng.engFormatLabel+eng.engCylCount+'气缸');
		pushItem(engContent,'安装方式',eng.engMountLabel);
		pushItem(engContent,'排气量',eng.engCapacity+'cc');
		pushItem(engContent,'气门',eng.engCamTypeLabel+', 每缸'+ ( parseInt(eng.engCylValveInlet)+ parseInt(eng.engCylValveExhaust))+'气门, 进气门'+eng.engCylValveInlet+'个， 排气门'+eng.engCylValveExhaust+'个');
		pushItem(engContent,'缸径 x 冲程',eng.engBore+' mm x '+eng.engStroke+' mm');
		pushItem(engContent,'压缩比',eng.engCompressionRatio+':1');
		pushItem(engContent,'最大马力',eng.engMaxPowerKW+'kw ('+eng.engMaxPowerHP+'ps) @ '+eng.engMaxPowerRPM+'RPM');
		pushItem(engContent,'最大扭矩',eng.engMaxTorqueNM+' N.m ('+eng.engMaxTorqueFTLB+' lbf.ft) @ '+eng.engMaxTorqueRPM+'RPM');
		pushItem(engContent,'进气方式',eng.engInductionTypeLabel);
		pushItem(engContent,'进气管直径',eng.engInductionTBDiameter+' mm');
		pushItem(engContent,'离合器',eng.engClutchOperationLabel+'操作, '+eng.engClutchTypeLabel);
		pushItem(engContent,'点火控制',eng.engIgnitionLabel);
		pushItem(engContent,'润滑方式',eng.engLubricationLabel);
		pushItem(engContent,'启动方式',eng.engStartingLabel);

		pushItem(ret,'发动机',engContent);		
	}

	var frameContent=[];
	if (data.frame.length>0){
		var frame=data.frame[0];

		pushItem(frameContent,'形式',frame.frameMaterialLabel+' '+frame.frameTypeLabel);
		pushItem(frameContent,'前倾角',frame.frameRake);
		pushItem(frameContent,'拖曳距',frame.frameTrail+' mm');
	}

	if(data.suspension.length>0){
		var susp=data.suspension[0];

		pushItem(frameContent,'前悬挂',
					(susp.suspFDiameter===0?'':susp.suspFDiameter+' mm ')+
					susp.suspFTypeLabel+'， '+
					(susp.suspFPreload===0?'':'预载 ')+
					(susp.suspFRebound===0?'':'回弹 ')+
					(susp.suspFCompression===0?'':'压缩 ')+
					((susp.suspFPreload===0 && susp.suspFRebound===0 && susp.suspFCompression===0)?'':'调教， ')+
					susp.suspFTravel+' mm 行程'
				);
		pushItem(frameContent,'后悬挂',
					(susp.suspRDiameter===0?'':susp.suspRDiameter+' mm ')+
					susp.suspRTypeLabel+'， '+
					(susp.suspRPreload===0?'':'预载 ')+
					(susp.suspRRebound===0?'':'回弹 ')+
					(susp.suspRCompression===0?'':'压缩 ')+
					((susp.suspRPreload===0 && susp.suspRRebound===0 && susp.suspRCompression===0)?'':'调教， ')+
					susp.suspRTravel+' mm 行程'
				);
	}

	if(data.brake.length>0){
		var brake=data.brake[0];

		pushItem(frameContent,'前刹车',
					brake.brakeFDiscCount+' x '+brake.brakeFDiscDiameter+' mm '+brake.brakeFTypeLabel+'， '+
					'每卡钳'+brake.brakeFDiscPistonCountPerCaliper+'活塞'
				);
		pushItem(frameContent,'后刹车',
					brake.brakeRDiscCount+' x '+brake.brakeRDiscDiameter+' mm '+brake.brakeRTypeLabel+'， '+
					'每卡钳'+brake.brakeRDiscPistonCountPerCaliper+'活塞'
				);
	};

	if(data.wheel.length>0){
		var wheel=data.wheel[0];

		pushItem(frameContent,'前轮',
					wheel.wheelFTyreWidth+'/'+wheel.wheelFTyreRatio+' ZR'+wheel.wheelFDiameter+
					'， '+wheel.wheelFTyreTypeLabel+
					'， '+wheel.wheelFRimTypeLabel+'轮圈'+
					(wheel.wheelFRimWidth===0?'':'， '+wheel.wheelFRimWidth+'英寸宽')
				);
		pushItem(frameContent,'后轮',
					wheel.wheelRTyreWidth+'/'+wheel.wheelRTyreRatio+' ZR'+wheel.wheelRDiameter+
					'， '+wheel.wheelRTyreTypeLabel+
					'， '+wheel.wheelRRimTypeLabel+'轮圈'+
					(wheel.wheelRRimWidth===0?'':'， '+wheel.wheelRRimWidth+'英寸宽')
				);
	}

	if(data.drive.length>0){
		var drive=data.drive[0];

		pushItem(frameContent,'变速方式',drive.drvTransmissionTypeLabel);
		pushItem(frameContent,'前进档位',drive.drvTransmissionGearCount+'个'+(drive.drvTransmissionGearRatio===''?'':'， '+drive.drvTransmissionGearRatio));
		if(drive.drvHasReverseGear===1)
			pushItem(frameContent,'后退档位','有');
		pushItem(frameContent,'传动方式',drive.drvWheelDriveTypeLabel);
		if(drive.drvPrimaryDriveRatio>0)
			pushItem(frameContent,'主变速比',drive.drvPrimaryDriveRatio);
		if(drive.drvFinalDriveRatio1>0)
			pushItem(frameContent,'传动比',
						drive.drvFinalDriveRatio1+
						(drive.drvFinalDriveRatio2>0?(' / '+drive.drvFinalDriveRatio2):'')
					);
		
	}

	pushItem(ret,'车架结构',frameContent);

	var dimContent=[];

	if(data.dimension.length>0){
		var dim=data.dimension[0];

		pushItem(dimContent,'长 x 宽 x 高',dim.dimLength+' mm x '+dim.dimWidth+' mm x '+dim.dimHeight+' mm');
		pushItem(dimContent,'轴距',dim.dimWheelBase+' mm');
		pushItem(dimContent,'座高',dim.dimSeatHeight+' mm'+
					(dim.dimSeatHeightAlt>0?(' （'+dim.dimSeatHeightAlt+' mm'+(dim.dimSeatHeightDesc===''?'':('， '+dim.dimSeatHeightDesc))+'）'):'')
				);
		if(dim.dimDryWeight>0)
			pushItem(dimContent,'干重',dim.dimDryWeight+' kg');
		if(dim.dimWetWeight>0)
			pushItem(dimContent,'湿重',dim.dimWetWeight+' kg');
		if(dim.dimGroundClearance>0)
			pushItem(dimContent,'离地距',dim.dimGroundClearance+' mm');
		if(dim.dimTankCapacity>0)
			pushItem(dimContent,'油箱容量',dim.dimTankCapacity+' L'+
						(dim.dimTankCapacityRes>0?(' （备用油 '+dim.dimTankCapacityRes+' L）'):'')
					);

	}

	pushItem(ret,'尺寸',dimContent);

	//console.log(JSON.stringify(ret));

	return ret;
};

function pushItem(arr,name,content){
	arr.push({
		name:name,
		content:content
	});
};


module.exports={
	getAll:getAll,
	getAllByBrandName:getAllByBrandName,
	getOneByNameAndYear:getOneByNameAndYear,
	getOneSpecsByNameAndYear:getOneSpecsByNameAndYear,
};
