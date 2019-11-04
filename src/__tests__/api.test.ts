import * as http from 'http'
import app from '../app'
import * as request from 'supertest';

describe('Unit tests for server', () => {
  const testPort: number = 3002;
  const baseAPIRoute: string = "/api/todos";
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    
    server.listen({ port: testPort }, () => {
      console.log('listening to test port')
      done()
    })
  })
    
  afterAll(async (done) => {
    server.close(done);
  })

  it('GET request for root endpoint', async () => {
    const response = await request(app).get('/');
    const result = JSON.parse(response.text)
    expect(result.message).toEqual('Welcome to the TODO-MVC API');
    expect(response.statusCode).toEqual(200);
  });

  it('Gets all todo items', async () => {
    const response = await request(app).get(baseAPIRoute);
    const result = JSON.parse(response.text)
    expect(result.message).toEqual('Gets all the todo items successfully!');
    expect(response.statusCode).toEqual(200);
  });

  it('Creates a new todo item', async () => {
    const response = await request(app).post(baseAPIRoute).send({key: 'object'})
    .set('Accept', 'application/json')
    const result = JSON.parse(response.text)
    expect(result.message).toEqual('Todo item created successfully!');
    expect(response.statusCode).toEqual(201);
  });

  it('Gets an individual todo item', async () => {
    const response = await request(app).get(`${baseAPIRoute}/:todoId`);
    const result = JSON.parse(response.text)
    expect(result.message).toEqual('Gets an individual todo item successfully!');
    expect(response.statusCode).toEqual(200);
  });

  it('Updates an existing todo item', async () => {
    const response = await request(app).put(`${baseAPIRoute}/:todoId`).send({key: 'object'})
    .set('Accept', 'application/json')
    const result = JSON.parse(response.text)
    expect(result.message).toEqual('Todo item updated successfully!');
    expect(response.statusCode).toEqual(200);
  });

  it('Deletes an individual todo item', async () => {
    const response = await request(app).delete(`${baseAPIRoute}/:todoId`);
    expect(response.statusCode).toEqual(204);
  });
});