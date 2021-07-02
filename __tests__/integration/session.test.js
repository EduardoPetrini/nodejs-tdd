const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(200);
  });

  it('Should no authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '654321'
      });

    expect(response.status).toBe(401);

  });
  it('should return a jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.body).toHaveProperty('token');

  });
});
