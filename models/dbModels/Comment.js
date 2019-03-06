const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentNewsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'news',
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    },
    like: [
        {
            type: String
        }
    ]
});

module.exports = Comment = mongoose.model('comment', commentNewsSchema);