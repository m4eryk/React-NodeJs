const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Config
const config = require('../../config/keys');

//Validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

//Create User router
const router = express.Router();

//User model
const User = require('../../models/dbModels/User');
const UserWork = require('../../models/dbModels/UserWork');
const Profile = require('../../models/dbModels/Profile');
const Work = require('../../models/dbModels/Work');

//@route POST api/work
//@desc Create work
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const work = new Work({
        user: req.user.id,
        title: req.body.title,
        task: req.body.task,
        requirements: req.body.requirements,
        category: req.body.category,
        jobType: req.body.jobType,
        currency: req.body.currency,
        cost: req.body.cost,
        paymentOptions: req.body.paymentOptions
    })

    work.save().then(work => res.status(200).json({1: 'ok'}))
})

//@route GET api/work
//@desc Get work
//@access Public
router.get('/', (req, res) => {
    Work.find()
    .populate('user', ['name', 'avatar'])
    .then(work => res.status(200).json(work))
})

//@route GET api/work/item/:work_id
//@desc Get a work 
//@access Public
router.get('/item/:work_id', (req, res) => {
    Work.findOne({_id: req.params.work_id})
        .populate('user', ['name', 'avatar'])
        .then(work => res.status(200).json(work))
});

//@route GET api/work/item/:work_id
//@desc Delete a work 
//@access Private
router.delete('/item/:work_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Work.findOneAndRemove({_id: req.params.work_id})
        .then(work => res.status(200).json(work))
});

//@route PUT api/work/item/:work_id
//@desc Update a work 
//@access Private
router.put('/item/:work_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const updateWork = {
        title: req.body.title,
        task: req.body.task,
        requirements: req.body.requirements,
        category: req.body.category,
        jobType: req.body.jobType,
        currency: req.body.currency,
        cost: req.body.cost,
        paymentOptions: req.body.paymentOptions,
        updateDate: Date.now()
      }

    Work.findOneAndUpdate(
        {$set: updateWork}
    ).then(res.status(200))
});

//@route Post api/work/search
//@desc Search a work 
//@access Publick
router.post('/search', (req, res) => {
    console.log(req.body)

    let find = {};
    let param = req.body;

    if(param.category != '')
        find = {category: req.body.category}
    else if(param.jobType != '')
        find = {jobType: req.body.jobType}
    else if(param.category != '' && param.jobType != '')
        find = {jobType: req.body.jobType, category: req.body.category}
    
    console.log(find)    

    if(param.sortBy === 'date'){
        Work.find(find)
        .sort('-date')
        .populate('user', ['name', 'avatar'])
        .then(work => res.status(200).json({work, find}))
    } else if(param.sortBy === 'salary'){
        Work.find(find)
        .sort({cost: -1})
        .populate('user', ['name', 'avatar'])
        .then(work => res.status(200).json({work, find}))
    } else {
        Work.find(find)
        .populate('user', ['name', 'avatar'])
        .then(work => res.status(200).json({work, find}))
    }
})


// router.get('/user/:user_id/video', (req, res) => {
//     const errors = {};
//     UserWork.find({ user: req.params.user_id, contentType: 'video'})
//         .populate('user', ['name', 'avatar']) //User collection
//         .then(profile => {  
//             res.json(profile);
//         })
//         .catch(err => res.status(404).json(err));
// });

module.exports = router;