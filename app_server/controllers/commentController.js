const comment = require('../../app_api/models/comment');
const catchAsync = require('../../app_api/utils/catchAsync');
const expressError = require('../../app_api/utils/ExpressError');
const guest = require('../../app_api/models/guest');


// get comment new comment form
_getCommentForm = catchAsync( async (req, res) => {
    const { id } = req.params;
    const g = await guest.findById(id);
    if(!g) throw new expressError('unable to locate guest', 500);

    res.render('comments/new', { title: 'New Comment', g });
});


_createComment = catchAsync( async (req, res) => {

  const newDate = new Date();
  const { commentTitle, newcomment, guest } = req.body;

  const newComment = new comment({
      date: newDate.toLocaleDateString(),
      time: newDate.toLocaleTimeString(),
      commentTitle: commentTitle,
      comment: newcomment,
      registeredGuest: guest
  });

  const c = newComment.save();

  if(!c) throw new expressError('can not create comment', 500);

  res.redirect('/');
})

_getComment = catchAsync( async (req, res) => {
    const { cid } = req.params

    const c = await comment.findById(cid);

    if(!c) throw new expressError('Unable to find comment', 500);

    res.render('/comments/edit', { title: "edit comment", c });
});

_editComment = catchAsync( async (req, res) => {
    const { id, cid } = req.params;
    const { commentTitle, comment } = req.body;
    const newDate = new Date();

    const updatedC = comment.findByIdAndUpdate(cid, {
        date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
        commentTitle: commentTitle,
        comment: comment,
        registeredGuest: id
    });

    if(!updatedC) throw new expressError('Unabel to update comment', 500);
    res.redirect('/');
});

_deleteComment = (req, res) => {
    res.send('this will delete one day');
}

module.exports.getCommentForm = _getCommentForm;
module.exports.createComment = _createComment;
module.exports.getComment = _getComment;
module.exports.editComment = _editComment;
module.exports.deleteComment = _deleteComment;

