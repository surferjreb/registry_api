const catchAsync = require('../../app_api/utils/catchAsync');
const expressError = require('../../app_api/utils/ExpressError');
const comment = require('../../app_api/models/comment');
const ExpressError = require('../../app_api/utils/ExpressError');


const _getIndex = catchAsync( async (req, res) => {
    const comments = await comment.find({}).populate('registeredGuest');
	if(!comments) throw new ExpressError('not found', 500);

	res.render('index', { title: 'Registry', comments });

});

module.exports.getIndex = _getIndex;
