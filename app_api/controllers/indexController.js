const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError');
const comment = require('../models/comment');
const ExpressError = require('../utils/ExpressError');


const _getIndex = catchAsync( async (req, res) => {
    const comments = await comment.find({}).populate('registeredGuest');
	if(!comments) throw new ExpressError('not found', 500);

	res.render('index', { title: 'Registry', comments });

});

const _sendJSONResponse = (res, status, content) => {
	try{
		res.status(status);
	    res.json(content);
	} catch(err) {
		throw new expressError(err, 500);
	}

}

const _testJson = (req, res) => {
	let status = 200;
	let content = { "status": "success" };
	_sendJSONResponse(res, status, content);
	res.send("You made it");
}

module.exports.getIndex = _getIndex;
module.exports.sendJSON = _sendJSONResponse;
module.exports.testJSON = _testJson;
