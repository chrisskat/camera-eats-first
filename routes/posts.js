var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');

router.get('/', postsCtrl.index);

router.get('/new', postsCtrl.new);

router.get('/:id', postsCtrl.show)

router.get('/:id/edit', postsCtrl.edit)

router.post('/', postsCtrl.create)

router.delete('/:id', postsCtrl.delete)

router.put('/:id', postsCtrl.update)

module.exports = router;