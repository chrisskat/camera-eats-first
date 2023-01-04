const Post = require('../models/post')

module.exports = {
    create,
    delete: deleteComment
}

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        post.comments.push(req.body);
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        })

    })
}

function deleteComment(req, res, next) {
    Post.findOne({'comments._id': req.params.id}).then(function(post) {
        const comment = post.comments.id(req.params.id);
        if (!comment.user.equals(req.user._id)) return res.redirect(`/posts/${post._id}`)
        comment.remove();
        post.save().then(function() {
            res.redirect(`/posts/${post._id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
}