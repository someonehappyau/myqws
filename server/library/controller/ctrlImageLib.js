'use strict';

var fs=require('fs');

var cfg=require('../../cfg/cfg');

function getImage(imgType,imgName,res){
	var r;
	if (imgType==='brand'){
		r=fs.createReadStream(cfg.imageLib.model.brand+imgName);
		r.on('open',function(){
			r.pipe(res);
		});
		r.on('error',function(err){
			res.status(404).end();
		});
	}
};

module.exports={
	getImage:getImage
};
