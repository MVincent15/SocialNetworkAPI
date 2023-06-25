const { Schema, Types, model } = require('mongoose');
const reaction = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
            //use a getter method to format the timestamp on query 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

 