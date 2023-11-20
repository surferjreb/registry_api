const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError');
const comment = require('../models/comment');
const ExpressError = require('../utils/ExpressError');
//const request = require('request');


// const apiOptions = {
// 	server: "http://localhost:3000"
// }


const _getJSONIndex = catchAsync( async (req, res) => {

	try{

        const comments = await comment.find({}, '-_id').populate('registeredGuest', '-_id');
	    if(!comments) throw new ExpressError('not found', 500);

        _sendJSONResponse(res, 200, comments );

	}catch(err) {
        _sendJSONResponse(res, 500, err);
	}

});

const _sendJSONResponse = (res, status, content) => {
	try{
		res.status(status);
	    res.json(content);
	} catch(err) {
		throw new expressError(err, 500);
	}

}

// const _testJson = (req, res) => {
// 	let status = 200;
// 	let content = { "status": "success" };
// 	_sendJSONResponse(res, status, content);
// 	//res.send("You made it");
// }

module.exports.getJSONIndex = _getJSONIndex;
module.exports.sendJSON = _sendJSONResponse;


// module.exports.testJSON = _testJson;
