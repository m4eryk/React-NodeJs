const express = require('express');
const passport = require('passport');

const router = express.Router();

const News = require('../../models/dbModels/News');
const Comment = require('../../models/dbModels/Comment');

//@route POST api/news
//@desc Create new news 
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body)
    const newNews = new News({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image,
        category: req.body.category,
        author: req.body.author,
        shortText: req.body.shortText,
        imageList: req.body.imageList,
        video: req.body.video
    });
    newNews.save().then(news => res.status(200).json(news))
});

//@route GET api/news/item/:news_id
//@desc Get one news 
//@access Public
router.get('/item/:news_id', (req, res) => {
    News.findOne({_id: req.params.news_id})
        .then(news => res.status(200).json(news))
});

//@route POST api/news/item/:news_id
//@desc Post new comment 
//@access Private
router.post('/item/:news_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const comment = new Comment({
        user: req.body.user,
        news: req.params.news_id,
        text: req.body.comment
    })
    console.log(comment)
    comment.save().then(comment => res.json(comment))
});

//@route Get api/news/item/comment/:news_id
//@desc Get comment lits for news 
//@access Public
router.get('/item/comment/:news_id', (req, res) => {
    Comment.find({news: req.params.news_id})
        .sort('-date')
        .populate('user', ['name', 'avatar', '_id'])
        .then(comment => res.status(200).json(comment))
});

//@route POST api/news/item/comment/:news_id
//@desc Add/Remove like of comment 
//@access Private
router.post('/item/comment/:news_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    comment = {
        like: req.body.idUser
    }

    Comment.findOne({_id : req.body.id, like: {$all: req.body.idUser}})
        .then(vul => {
            if(vul){
                Comment.findOneAndUpdate(
                    {_id : req.body.id},
                    {$pull: comment},
                    
                ).then(v => res.status(200).json('done'))
            } else {
                Comment.findOneAndUpdate(
                    {_id : req.body.id},
                    {$push: comment}
                ).then(v => res.status(200).json('done'))
            }
        }
    )
});

//@route GET api/news/music
//@desc Get news of music
//@access Public
router.get('/music', (req, res) => {
    News.find({category: 'music'})
        .sort('-date')
        .then(vul => res.json(vul))
});

//@route GET api/news/art
//@desc Get news of art 
//@access Public
router.get('/art', (req, res) => {
    News.find({category: 'art'})
        .sort('-date')
        .then(vul => res.json(vul))
});

//@route GET api/news/film
//@desc Get news of film 
//@access Public
router.get('/film', (req, res) => {
    News.find({category: 'film'})
        .sort('-date')
        .then(vul => res.json(vul))
});

//@route GET api/news/mainnews
//@desc Get main news
//@access Public
router.get('/mainnews', (req, res) => {
    News.find({category: 'mainNews'})
        .sort('-date')
        .limit(4)
        .then(vul => res.json(vul))
});


module.exports = router;