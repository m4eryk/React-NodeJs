const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopItemSchema = new Schema({
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
    category: {
        type: String
    },
    cost: {
        type: String
    },
    imageList: [
        {
            imgPath:{
                type: String
            }
        }
    ],
    paymentOptions: [
        {
            type: String
        }
    ],
    currency: {
        type: String
    },
    titleImage: {
        type: String,
        default: 'http://s1.iconbird.com/ico/2013/9/449/w256h2561380452264WindowsMediaPlayer.png'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = ShopItem = mongoose.model('shopItem', shopItemSchema);