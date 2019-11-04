import * as mongoose from 'mongoose';
import { TodoSchema } from '../models/todosModel';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../status_codes'

const TodoItem = mongoose.model('Contact', TodoSchema);

export class TodoController {
  public getAllTodoItems (req: Request, res: Response) {
    TodoItem.find({}, (err, todos) => {
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      if(!todos.length){
        return res.send('There are no todo items')
      }
      res.status(HttpStatusCode.OK).json(todos)
    })
  }

  public getTodoById (req: Request, res: Response) {
    const id = req.params.todoId;
    TodoItem.findById(id, (err, todo) => {
      if (!todo) {
        return res.status(HttpStatusCode.NOT_FOUND).send('The todo item you are trying to update does not exist')
      }
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      res.status(HttpStatusCode.OK).json(todo)
    })
  }

  public getCompletedTodoItems (req: Request, res: Response) {
    TodoItem.find({completed: true}, (err, todos) => {
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      if(!todos.length){
        return res.send('There are no completed todo items')
      }
      res.status(HttpStatusCode.OK).json(todos)
    })
  }

  public getNonCompletedTodoItems (req: Request, res: Response) {
    TodoItem.find({completed: false}, (err, todos) => {
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      if(!todos.length){
        return res.send('There are no non-completed todo items')
      }
      res.status(HttpStatusCode.OK).json(todos)
    })
  }

  public addNewTodo (req: Request, res: Response) {
    let newTodo = new TodoItem(req.body);
    newTodo.save((err, todo) => {
      if(!req.body.text || req.body.text.trim().length === 0){
        return res.status(HttpStatusCode.BAD_REQUEST).send('No text provided. Please provide a valid text')
      }
      if(err) {
        res.send('Oops, something went wrong: ' + err);
      }    
      res.status(HttpStatusCode.CREATED).json(todo);
      console.log('saved ok')
    })
  }

  public updateTodo (req: Request, res: Response) {
    TodoItem.findByIdAndUpdate(req.params.todoId, req.body, { new: true }, (err, todo) => {
      if (!todo) {
        return res.status(HttpStatusCode.NOT_FOUND).send('The todo item you are trying to update does not exist')
      }
      if(!req.body.text || req.body.text.trim().length === 0){
        return res.status(HttpStatusCode.BAD_REQUEST).send('No text provided. Please provide a valid text')
      }
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      res.status(HttpStatusCode.OK).json(todo);
    })
  }

  public deleteTodo (req: Request, res: Response) {           
    TodoItem.findByIdAndDelete(req.params.todoId, (err, todo) => {
      if (!todo) {
        return res.status(HttpStatusCode.NOT_FOUND).send('The todo item you are trying to delete does not exist')
      }
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      res.status(HttpStatusCode.NO_CONTENT).json({ message: 'Successfully deleted todo item!'});
    });
  }

  public deleteAllTodos (req: Request, res: Response) {           
    TodoItem.deleteMany({}, (err) => {
      if(err){
        return res.send('Oops, something went wrong: ' + err);
      }
      res.status(HttpStatusCode.NO_CONTENT).json({ message: 'Successfully deleted all the todo items!'});
    });
  }
}