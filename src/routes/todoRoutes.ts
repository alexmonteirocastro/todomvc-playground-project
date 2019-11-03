import {Request, Response} from "express";
import { HttpStatusCode } from '../status_codes'

const baseRoute: string = "/api/todos";

export class Routes {       
  public routes(app): void {          
    app.route('/')
      .get((req: Request, res: Response) => {            
        res.status(HttpStatusCode.OK).send({
          message: 'Welcome to the TODO-MVC API'
        })
      })
        
    // Todo items 
    app.route(baseRoute) 
      // GET endpoint 
      .get((req: Request, res: Response) => {
        // Gets all todo items         
        res.status(HttpStatusCode.OK).send({
          message: 'Gets all the todo items successfully!'
        })
      }) 

    // POST endpoint
      .post((req: Request, res: Response) => {   
        // Create new todo item         
        res.status(HttpStatusCode.CREATED).send({
           message: 'Todo item created successfully!'
        })
      })

    // Individual todo item endpoints
    app.route(`${baseRoute}/:todoId`)
      // get specific todo item
      .get((req: Request, res: Response) => {
        // Get a single todo item detail s           
        res.status(HttpStatusCode.OK).send({
          message: 'Gets an individual todo item successfully!'
        })
      })
      
      .put((req: Request, res: Response) => {
        // Update a todo item           
        res.status(HttpStatusCode.OK).send({
          message: 'Todo item updated successfully!'
        })
      })
        
      .delete((req: Request, res: Response) => {       
        // Delete a todo item     
        res.status(HttpStatusCode.NO_CONTENT).send({
          message: 'Todo item deleted successfully'
        })
      })
  }
}