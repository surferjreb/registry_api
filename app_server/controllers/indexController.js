const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError');
const comment = require('../models/comment');
const ExpressError = require('../utils/ExpressError');


const _getIndex = catchAsync( async (req, res) => {
    const comments = await comment.find({}).populate('registeredGuest');
	if(!comments) throw new ExpressError('not found', 500);

	res.render('index', { title: 'Registry', comments });

});

module.exports.getIndex = _getIndex;
