import { GracefulShutdownManager } from "@moebius/http-graceful-shutdown";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import todos from "./routes/todos";

const app: Application = express();

mongoose.connect("mongodb://localhost/todomvc", {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to Mongo.", err));

app.use(cors());
app.use(express.json());
app.use(todos);

// routes
app.get("/", (req: Request, res: Response) => res.send("Hej"));

const port: number | string = process.env.PORT || 9000;
const server = app.listen(port, () => {
    console.log(`Server listing on port ${port}...`);
});

const shutdownManager = new GracefulShutdownManager(server);

const onShutDown = () => {
  process.stdin.resume();
  shutdownManager.terminate(() => {
    mongoose.disconnect(() => {
      console.log("disconnecting from db...");
    });
    console.log("Server is gracefully terminated");
  });
};

process.on("SIGINT", () => {
  onShutDown();
});

process.on("SIGTERM", () => {
  onShutDown();
});
