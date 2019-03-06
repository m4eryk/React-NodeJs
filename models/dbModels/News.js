const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    shortText: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    author: {
        type: String
    },
    video: {
        type: String
    },
    imageList: [
        {
            imgPath: {
                type: String
            },
            label: {
                type: String
            }
        }
    ]
});

module.exports = News = mongoose.model('news', newsSchema);