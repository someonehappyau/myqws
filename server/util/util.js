'use strict';

function toResponse(result,data){
	return JSON.stringify({
		result:result,
		data:data
	});
};

module.exports={
	toResponse:toResponse,
};
