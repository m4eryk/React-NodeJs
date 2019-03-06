const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWorkShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    contentType: {
        type: String
    },
    contentRef: {
        type: String
    },
    titleImage: {
        type: String,
        default: 'http://s1.iconbird.com/ico/2013/9/449/w256h2561380452264WindowsMediaPlayer.png'
    },
    imageWidth: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserWork = mongoose.model('userWork', userWorkShema);