const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongooseTrigger = require('mongoose-trigger');

const WorkShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    task: {
        type: String
    },
    requirements: {
        type: String
    },
    category: {
        type: String
    },
    jobType: {
        type: String
    },
    currency: {
        type: String
    },
    cost: {
        type: String
    },
    paymentOptions: [
        {
            type: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
    }
})

const WorkEvent = MongooseTrigger(WorkShema, {
    events: {
        update: {
            //updateDate: Date.now
        },
        create: {

        }
    }
});


WorkEvent.on('update', data => console.log(`[update] says:`, data))
WorkEvent.on('create', data => console.log('[create] says:', data));

module.exports = Comment = mongoose.model('work', WorkShema);