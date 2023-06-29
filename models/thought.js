const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,   
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: function(value) {
          return moment(value).format('MM-DD-YYYY HH:mm:ss');
        }
        
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

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
            get: function(value) {
              return moment(value).format('MM-DD-YYYY HH:mm:ss');
            }
            
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
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
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

 