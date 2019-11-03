import {Request, Response} from "express";

const baseRoute: string = "/api/todos";

export class Routes {       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Welcome to the TODO-MVC API'
            })
        })
        
        // Todo items 
        app.route(baseRoute) 
        // GET endpoint 
        .get((req: Request, res: Response) => {
        // Get all todo items         
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })        
        // POST endpoint
        .post((req: Request, res: Response) => {   
        // Create new todo item         
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        })

        // Todo item detail
        app.route(`${baseRoute}/:todoId`)
        // get specific todo item
        .get((req: Request, res: Response) => {
        // Get a single todo item detail s           
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        .put((req: Request, res: Response) => {
        // Update a todo item           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })
        .delete((req: Request, res: Response) => {       
        // Delete a todo item     
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            })
        })
    }
}