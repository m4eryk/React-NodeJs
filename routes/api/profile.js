const express = require('express');
const passport = require('passport');

//Create profile router
const router = express.Router();

//Load Profile Schema
const Profile = require('../../models/dbModels/Profile');
//Load User Schema
const User = require('../../models/dbModels/User');

//@route GET api/profile/user/:user_id
//@desc Get profile by user ID
//@access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }else{
                res.json(profile);
            }

           // res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route POST api/profile
//@desc Create or Edit user profile
//@access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const profileUpdate = {
        surname: req.body.surname,
        firstname: req.body.firstname,
        skills: req.body.skills,
        location: req.body.location,
        bio: req.body.bio,
        gender: req.body.gender,
        birthday: req.body.birthday
    }

    Profile.findOneAndUpdate(
        { user: req.user._id }, 
        {$set: profileUpdate}
    )
    .then(profile => res.json(profile))
    .catch(err => console.log(err))
});

const UserWork = require('../../models/dbModels/UserWork');

router.get('/work/:work_id', (req, res) => {
    const errors = {};
    UserWork.findOne({ _id: req.params.work_id})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }else{
                res.json(profile);
            }
        })
        .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id/image', (req, res) => {
    const errors = {};
    UserWork.find({ user: req.params.user_id, contentType: 'image'})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }else{
                res.json(profile);
            }
        })
        .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id/video', (req, res) => {
    const errors = {};
    UserWork.find({ user: req.params.user_id, contentType: 'video'})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id/music', (req, res) => {
    const errors = {};
    UserWork.find({ user: req.params.user_id, contentType: 'music'})
        .populate('user', ['name', 'avatar']) //User collection
        .then(profile => {  
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


router.get('/test', (req, res) => res.status(200).json({j: 'gi'}));

module.exports = router;