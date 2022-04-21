const request = require('supertest');
const app = require('../app');
const db = require('../db');
const User = require('../models/user');

beforeAll(async () => {
  await db.query('DELETE FROM users');

  await User.register({
    username: 'test1',
    firstName: 'Test',
    lastName: 'User',
    password: 'test123'
  });
});


describe('POST /auth/token', () => {
  test('Authenticates a user and returns a token', async () => {
    const response = await request(app).post('/auth/token')
      .send({ username: 'test1', password: 'test123'});

    expect(response.body).toEqual({ token: expect.any(String) });
  });

  test('Throws an error if credentials cannot be authenticated', async () => {
    const response = await request(app).post('/auth/token')
      .send({ username: 'tester', password: 'wrong' });

    expect(response.body).toEqual({
      error: {
        message: 'Invalid username or password!',
        status: 401
      }
    })
  });
});

describe('POST /auth/register', () => {
  test('Creates a new user and returns a token', async () => {
    const response = await request(app).post('/auth/register')
      .send({
        username: 'test2',
        firstName: 'Test',
        lastName: 'User',
        password: 'test456'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeTruthy();
  });

  test('Throws an error if user already exists', async () => {
    const response = await request(app).post('/auth/register')
      .send({
        username: 'test1',
        firstName: 'Test',
        lastName: 'User',
        password: 'test123'
      });

    expect(response.body).toEqual({
      error: {
        message: 'Duplicate username: test1',
        status: 400
      }
    });
  });
});


afterAll(async () => {
  await db.query('DELETE FROM users')
  await db.end();
});