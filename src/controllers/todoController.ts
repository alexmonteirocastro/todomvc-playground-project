import * as mongoose from 'mongoose';
import { TodoSchema } from '../models/todosModel';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../status_codes'

const TodoItem = mongoose.model('Contact', TodoSchema);

export class TodoController {
  public getAllTodoItems (req: Request, res: Response) {
    console.log('fetching all todo items...')
    TodoItem.find({}, (err, todos) => {
      if(err){
        res.send(err)
      }
      res.status(HttpStatusCode.OK).json(todos)
    })
  }

  public getTodoById (req: Request, res: Response) {
    const id = req.params.todoId;
    TodoItem.findById(id, (err, todos) => {
      if(err){
        res.send(err)
      }
      res.status(HttpStatusCode.OK).json(todos)
    })
  }

  public addNewTodo (req: Request, res: Response) {
    let newTodo = new TodoItem(req.body);
    newTodo.save((err, todo) => {
      if(err) {
        res.send(err);
      }    
      res.status(HttpStatusCode.CREATED).json(todo);
      console.log('saved ok')
    })
  }

  public updateTodo (req: Request, res: Response) {
    TodoItem.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true }, (err, todo) => {
      if(err){
          res.send(err);
      }
      res.status(HttpStatusCode.OK).json(todo);
    })
  }

  public deleteTodo (req: Request, res: Response) {           
    TodoItem.remove({ _id: req.params.todoId }, (err) => {
        if(err){
            res.send(err);
        }
        res.status(HttpStatusCode.NO_CONTENT).json({ message: 'Successfully deleted todo item!'});
    });
  }
}