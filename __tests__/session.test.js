const request = require('supertest');

const app = require('../src/app');

describe('Session Controller', () => {
  it('should be able to authenticate with valid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate with invalid user email', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'invalid-email',
      password: '123456',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('User not found');
  });

  it('should not be able to authenticate with invalid password', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: 'invalid-password',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Incorrect password');
  });
});
