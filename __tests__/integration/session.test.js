const request = require('supertest');

const app = require('../../src/app');

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not authenticate with invalid user email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'john@teste.com',
        password: '123456',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('User not found');
  });

  it('should not authenticate with invalid password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'johndoe@gmail.com',
        password: '321321',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Incorrect password');
  });
});
