import app from "../index";

import mongoose from "mongoose";
import { Server } from "net";
import supertest from "supertest";

const databaseName = "testdb";

describe("jest?", () => {
  let request: any;
  let server: any;

  beforeAll(async () => {
    // Connect to a Mongo DB
    server = app.listen(4000);
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
    request = supertest(server);
  });

  afterAll(async (done) => {
    // Closes the Mongoose connection
    await mongoose.connection.close();
    server.close(done);
  });

  it("gets the root endpoint", async (done) => {
    const res = await request.get("/");
    console.log(res.body);
    done();
  });
});
