const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Config
const config = require('../../config/keys');

//Validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

const router = express.Router();

//Load Schema
const Profile = require('../../models/dbModels/Profile');
const User = require('../../models/dbModels/User');
const Comment = require('../../models/dbModels/Comment');
const ShopItem = require('../../models/dbModels/ShopItem');

//@route POST api/shop
//@desc Create shop item
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const shopItem = new ShopItem({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        cost: req.body.cost,
        imageList: req.body.imageList,
        paymentOptions: req.body.paymentOptions,
        titleImage: req.body.titleImage,
        currency: req.body.currency
    })

    shopItem.save().then(shopItem => res.status(200).json({1: 'ok'}))
});

//@route GET api/shop
//@desc Get shop items
//@access Public
router.get('/', (req, res) => {
    ShopItem.find()
    .populate('user', ['name', 'avatar'])
    .then(shopItem => res.status(200).json(shopItem))
});

//@route GET api/shop/three
//@desc Get 3 shop items
//@access Public
router.get('/three', (req, res) => {
    ShopItem.find()
    .limit(3)
    .populate('user', ['name', 'avatar'])
    .then(shopItem => res.status(200).json(shopItem))
});

//@route GET api/shop/item/:shop_id
//@desc Get a shop item 
//@access Public
router.get('/item/:shop_id', (req, res) => {
    ShopItem.findOne({_id: req.params.shop_id})
        .populate('user', ['name', 'avatar'])
        .then(shopItem => res.status(200).json(shopItem))
});

//@route GET api/shop/item/:shop_id
//@desc Delete a work 
//@access Private
router.delete('/item/:shop_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Work.findOneAndRemove({_id: req.params.shop_id})
        .then(shopItem => res.status(200).json(shopItem))
});

//@route PUT api/shop/item/:shop_id
//@desc Update a work 
//@access Private
router.put('/item/:shop_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const updateShop = {
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        imageList: req.body.imageList,
        titleImage: req.body.titleImage,
        cost: req.body.cost,
        paymentOptions: req.body.paymentOptions,
        currency: req.body.currency
    }

    Work.findOneAndUpdate(
        {$set: updateShop}
    ).then(res.status(200))
});

module.exports = router;