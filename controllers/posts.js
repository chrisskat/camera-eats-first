const { MongoDriverError } = require('mongodb')
const Post = require('../models/post')


module.exports = {
    index,
    new: newPost,
    create,
    show,
    delete: deletePost
}

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', { posts })
    })
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/show', { post })
    });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'Add Post'})
}

function deletePost(req, res) {
    Post.findOneAndDelete(req.params.id, function(err) {
          res.redirect('/posts');
        }
      );
}



function create(req, res) {
    const post = new Post(req.body);
    post.save(function(err) {
    // one way to handle errors
    if (err) return res.render('posts/new');
    console.log(post);
    // for now, redirect right back to new.ejs
    res.redirect('/posts');
  });
}

