const express = require('express');
const passport = require('passport');

//Create profile router
const router = express.Router();

//Load Profile Schema
const Profile = require('../../models/dbModels/Profile');
//Load User Schema
const User = require('../../models/dbModels/User');
const Comment = require('../../models/dbModels/Comment');

router.get('/video', (req, res) => {
    const errors = {};
    UserWork.find({contentType: 'video'})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/music', (req, res) => {
    const errors = {};
    UserWork.find({contentType: 'music'})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/image', (req, res) => {
    const errors = {};
    UserWork.find({contentType: 'image'})
        .populate('user', ['name', 'avatar']) //User collection
        .limit(11)
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.post('/image/moreimage', (req, res) => {
    const errors = {};
    console.log(req.body)
    UserWork.find({contentType: 'image'})
        .populate('user', ['name', 'avatar']) //User collection
        .skip(req.body.skip)
        .limit(11)
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


router.get('/video/:video_id', (req, res) => {
    const errors = {};
    UserWork.find({contentType: 'video', _id: req.params.video_id})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route POST api/galery/post/:post_id
//@desc Post new comment 
//@access Private
router.post('/post/:news_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const comment = new Comment({
        user: req.body.user,
        news: req.params.news_id,
        text: req.body.comment
    })

    comment.save().then(comment => res.json(comment))
});


module.exports = router;