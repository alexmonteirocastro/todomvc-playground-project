import { NextFunction, Request, Response } from 'express';
 
function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  console.log(request.method, request.url, response.statusCode)
  next()
}
 
export default loggerMiddleware;