const mongoose = require('mongoose')
// opitonal shortcut to the mongoose.Schema class
const Schema = mongoose.Schema


const commentSchema = new Schema({
    content: {type: String, required: true},
    // Add the 3 new properties below
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const postSchema = new Schema({
    
    userName: String,
    userAvatar: String,
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: String,
    comments: [commentSchema],
    
}, {
    timestamps: true
})


  
  module.exports = mongoose.model('Post', postSchema)