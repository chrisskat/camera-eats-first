const Post = require('../models/post')

module.exports = {
    index,
}

function index(req, res) {
        res.render('posts/index')
    }