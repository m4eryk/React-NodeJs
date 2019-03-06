const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user schema
const userShema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/avatar%2FdefaultAvatar%2Fstandart.png?alt=media&token=a850cb10-d147-44aa-bc53-0fa7715897ae'
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user', userShema);