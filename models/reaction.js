const { Schema, Types } = require('mongoose');

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
      // uesr a getter method to format the timestamp on the query 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;


//schema settings, this will not be a model but rather will be used as the reaction fields subdocument in the schema in the thought model 