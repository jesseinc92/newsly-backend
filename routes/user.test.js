const request = require('supertest');
const app = require('../app');
const db = require('../db');

const User = require('../models/user');
const Metric = require('../models/metric');

beforeAll(async () => {
  await db.query('DELETE FROM users');

  const user4 = await User.register({
    username: 'test4',
    firstName: 'TU4',
    lastName: 'Surname',
    password: 'test123'
  });

  const user4Metrics = await Metric.create(user4);
  user4.metrics = user4Metrics;

  const user5 = await User.register({
    username: 'test5',
    firstName: 'TU5',
    lastName: 'Surname',
    password: 'test123'
  });

  const user5Metrics = await Metric.create(user5);
  user5.metrics = user5Metrics;
});


describe('GET /user/{username}', () => {
  test('Gets a specified user', async () => {
    const response = await request(app).get('/user/test4');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object)
  });

  test('Throws error if user does not exist', async () => {
    const response = await request(app).get('/user/test2');

    expect(response.body).toEqual({
      error: {
        message: 'User test2 does not exist.', 
        status: 404
      }
    })
  });
});


describe('PUT /user/{username}', () => {
  test('Updates user information', async () => {
    const response = await request(app).put('/user/test5')
      .send({
        username: 'test4',
        firstName: 'TU4',
        lastName: 'Lasty'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user.lastName', 'Lasty')
  });

  test('Throws an error is the user does not exist', async () => {
    const response = await request(app).put('/user/test1')
      .send({
        username: 'test1',
        firstName: 'TU4',
        lastName: 'Lasty'
      });

    expect(response.statusCode).toBe(404);
  });
});


describe('DELETE /user/{username}', () => {
  test('Deletes a user', async () =>{
    const response = await request(app).delete('/user/test4');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      deleted: 'test4'
    });
  });

  test('Throws an error is user is not found', async () => {
    const response = await request(app).delete('/user/test10');

    expect(response.statusCode).toBe(404);
  });
});


describe('POST /user/{username}/goals', () => {
  test('Should update a given user goal', async () => {
    const response = await request(app).post('/user/test5/goals')
      .send({ 
        goal: {
          goal: 'business'
      }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      metrics: {
        goal: 'business'
      }
    });
  });
});


describe('POST /user/{username}/metrics', () => {
  test('Successfully updates metrics', async () => {
    const response = await request(app).post('/user/test5/metrics')
      .send({
        metrics: {
          usNews: 1,
          worldNews: 2,
          business: 3,
          opinion: 4,
          sport: 5,
          culture: 6,
          science: 7,
          lifestyle: 8,
          metricsqueue: ['lifestyle']
        }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('response', 'Successfully updated');
  });

  test('Throws an error if the request is bad', async () => {
    const response = await request(app).post('/user/test10/metrics')
      .send({
        metrics: {
          usNews: 1,
          worldNews: 2,
          business: 3,
          opinion: 4,
          sport: 5,
          culture: 6,
          science: 7,
          lifestyle: 8,
          metricsqueue: []
        }
      });
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: {
        message: 'Something went wrong!',
        status: 400
      }
    });
  });
});


describe('POST /user/{username}/bookmarks', () => {
  test('Adds an article to user bookmarks', async () => {
    const response = await request(app).post('/user/test5/bookmarks')
      .send({
          articleId: 'fakeId', 
          title: 'fakeTitle', 
          sectionId: 'yes', 
          sectionName: 'Yes'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      article: {
        userId: 'test5',
        id: 'fakeId', 
        webTitle: 'fakeTitle', 
        sectionId: 'yes', 
        sectionName: 'Yes'
      }
    })
  });

  test('Throws an error if a duplicate add attempt is made', async () => {
    const response = await request(app).post('/user/test5/bookmarks')
      .send({
          articleId: 'fakeId', 
          title: 'fakeTitle', 
          sectionId: 'yes', 
          sectionName: 'Yes'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error.message).toEqual('Bookmark already exists!');
  });
});


describe('DELETE /user/{username}/bookmarks', () => {
  test('Delete a user', async () => {
    const response = await request(app).delete('/user/test5/bookmark')
      .send({
        articleId: 'fakeId'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Bookmark deleted!'
    });
  });

  test('Throws an error if no user found', async () => {
    const response = await request(app).delete('/user/test5/bookmark')
      .send({
        articleId: 'fakeId'
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: {
        message: 'Bookmark not found!',
        status: 404
      }
    });
  });
});


afterAll(async () => {
  await db.query('DELETE FROM users')
  await db.end();
})