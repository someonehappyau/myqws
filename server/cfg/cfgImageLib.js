var path=require('path');

var imageLibPath=
{
	model:{
		brand:path.join(__dirname,'../../../imageLib/manual/mc/brand/'),
		country:path.join(__dirname,'../../../imageLib/manual/mc/country/'),
		web:path.join(__dirname,'../../../imageLib/pool/web/mc/model/')
	},
	race:{
		motogp:path.join(__dirname,'../../../imageLib/manual/race/motogp/')
	},
	misc:path.join(__dirname,'../../../imageLib/manual/misc/')
};

module.exports=imageLibPath
