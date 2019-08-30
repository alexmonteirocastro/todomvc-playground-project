import Joi from "joi";
import mongoose from "mongoose";

interface ITodo {
    completed: boolean;
    text: string;
}

const todoSchema = new mongoose.Schema({
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

export const Todo = mongoose.model("Todo", todoSchema);

export const validateTodo = (todoItem: ITodo) => {
    const schema = {
        completed: Joi.boolean(),
        text: Joi.string().min(1).max(255)
    };
    return Joi.validate(todoItem, schema);
};
