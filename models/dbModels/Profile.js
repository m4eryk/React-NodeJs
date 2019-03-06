const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Profile
const profileShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    location: {
        label: String,
        value: String
    },

    skills: [
        {
            label: String,
            value: String
        }
    ],

    bio: {
        type: String
    },

    firstname: {
        type: String
    },

    surname: {
        type: String
    },

    gender: {
        type: String
    },

    birthday: {
        type: String
    },

    experience: [
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            discription: {
                type: String
            },
        }
    ],

    education: [
        {
            school: {
                type: String,
                require: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            discription: {
                type: String
            },
        }
    ],

    social: [
        {
            source: {
                type: String,
                default: 'YouTube'
            },
            link: String
        },
        {
            source: {
                type: String,
                default: 'Twitter'
            },
            link: String
        },
        { 
            source: {
                type: String,
                default: 'Facebook'
            }, 
            link: String
        },
        {
            source: {
                type: String,
                default: 'Linkedin'
            }, 
            link: String
        },
        {
            source: {
                type: String,
                default: 'Instagram'
            }, 
            link: String
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', profileShema);