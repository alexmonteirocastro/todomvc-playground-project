import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
  completed: {
    default: false,
    required: true,
    type: Boolean
  },
  text: {
    maxlength: 255,
    minlength: 1,
    required: true,
    type: String
  }
});