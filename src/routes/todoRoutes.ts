import {Request, Response, NextFunction} from "express";
import { HttpStatusCode } from '../status_codes'
import { TodoController } from '../controllers/todoController'
import HttpException from '../exceptions/HttpException';

const baseRoute: string = "/api/todos";
export class Routes {       
  public todoController: TodoController = new TodoController();
  
  public routes(app): void {          
    app.route('/')
      .get((req: Request, res: Response) => {            
        res.status(HttpStatusCode.OK).send({
          message: 'Welcome to the TODO-MVC API'
        })
      })
        
    // Todo items 
    app.route(baseRoute) 
      // GET endpoint - Gets all todo items
      .get(this.todoController.getAllTodoItems)
      // POST endpoint - Creates a new todo item
      .post(this.todoController.addNewTodo)

    // Individual todo item endpoints
    app.route(`${baseRoute}/:todoId`)
      // gets an existing todo item
      .get(this.todoController.getTodoById)
      //edits an existing todo item
      .put(this.todoController.updateTodo)
      // deletes an existing todo item
      .delete(this.todoController.deleteTodo)
  }
}