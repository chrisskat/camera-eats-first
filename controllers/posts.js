const { MongoDriverError } = require('mongodb')
const Post = require('../models/post')


module.exports = {
    index,
    new: newPost,
    create,
    show,
    delete: deletePost,
    edit,
    update
}


async function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', { posts,  })
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

async function deletePost(req, res) {
    let post = await Post.findByIdAndDelete(req.params.id)
        console.log(post)

    
    res.redirect('/posts')
}

function create(req, res) {
    
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    const post = new Post(req.body);
    post.save(function(err) {
    // one way to handle errors
    if (err) return res.render('posts/new');
    console.log(post);
    // for now, redirect right back to new.ejs
    res.redirect('/posts');
  });
}


function edit(req, res) {
    Post.findById(req.params.id).then(function (post) {
    res.render("posts/edit", {post})
 })
}

async function update(req, res, next) {
    try{
    const filter = { _id: req.params.id };
        let post = await Post.findOneAndUpdate(filter, req.body, {
            upsert: true
        });
        await post.save((err) => {
            return res.redirect("/posts/")
        })
    
    
    } catch{(err)=>{
    console.warn(err.message)
    
    }
    
    }
        
    }