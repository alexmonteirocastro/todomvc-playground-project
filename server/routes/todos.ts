import { Router } from "express";
import { Todo, validateTodo } from "../models/todo";

const baseRoute: string = "/api/todos";
const router = Router();

router.get(baseRoute, async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        console.log(error);
    }
});

router.post(baseRoute, async (req, res) => {
    try {
        const { error } = validateTodo(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const newTodo = new Todo({ completed: req.body.completed, text: req.body.text });

        await newTodo.save();
        res.send(newTodo);

    } catch (error) {
        console.log(error);
    }

});

router.delete(`${baseRoute}/:id`, async (req, res) => {
    try {
        const removedTodo = await Todo.findByIdAndRemove(req.params.id);
        const updatedTodoList = await Todo.find();

        if (!removedTodo) { return res.status(404).send("The todo item with the given Id was not found"); }

        res.send(updatedTodoList);
    } catch (error) {
        console.log(error);
    }
});

export default router;
