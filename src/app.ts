import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/todoRoutes";
import errorMiddleware from './middleware/error.middleware'
import loggerMiddleware from './middleware/request_logger.middleware'
import * as mongoose from "mongoose";

class App {

  public app: express.Application = express()
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/todomvc';

  constructor() {
      this.config();  
      this.mongoSetup();      
      this.routePrv.routes(this.app);
  }

  private config(): void {
    //for debugging purposes
    this.app.use(loggerMiddleware)
    //for handling errors
    this.app.use(errorMiddleware)
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    require('mongoose').Promise = global.Promise
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
      if (!err) console.log('MongoDB has connected successfully.');
    });
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to ' + this.mongoUrl);
    });
    mongoose.connection.on('error', (err) => {
      console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });    
  }
}

export default new App().app;