'use strict';

var fs=require('fs');

var cfg=require('../../cfg/cfg');

function getImage(req,res){
	var imgType=req.params.imgType;
	var imgName=req.params.imgName+req.params[0];
	var r;
	if (imgType==='brand'){
		r=fs.createReadStream(cfg.imageLib.model.brand+imgName);
	}
	else if (imgType==='web'){
		r=fs.createReadStream(cfg.imageLib.model.web+imgName);
	}
	else if (imgType==='motogp'){
		r=fs.createReadStream(cfg.imageLib.race.motogp+imgName);
	}
	else if (imgType==='misc'){
		r=fs.createReadStream(cfg.imageLib.misc+imgName);
	}
	
	r.on('open',function(){
		r.pipe(res);
	});
	r.on('error',function(err){
		res.status(404).end();
	});
};

module.exports={
	getImage:getImage
};
