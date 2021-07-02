const { User } = require('../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Dudu Test',
      email: 'test@petrini.com',
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
    const user = await User.create({
      name: 'Dudu Test',
      email: 'test@petrini.com',
      password_hash: '654321'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(401);
  });
});
