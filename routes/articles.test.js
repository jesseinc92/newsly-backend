const request = require('supertest');
const app = require('../app');
const db = require('../db');


describe('GET /articles', () => {
  test('Fetches the newest articles', async () => {
    const response = await request(app).get('/articles');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.articles).toBeTruthy();
  });
});


describe('GET /articles/search', () => {
  test('Searches for articles by keyword', async () => {
    const response = await request(app).get('/articles/search?keyword=cookies');

    expect(response.statusCode).toBe(200);
    expect(response.body.articles).toBeTruthy();
  });

  test('Searches for articles by section', async () => {
    const response = await request(app).get('/articles/search?section=film');

    expect(response.statusCode).toBe(200);
    expect(response).toBeTruthy();
    expect(response.body.articles[0].sectionName).toBe('Film');
  });
});


describe('GET /articles/{articleId}', () => {
  const articleId = "food/2022/jan/14/how-to-eat-cookies";
  const escapedId = articleId.replaceAll('/', '%2F');
  test('Retrieves a single article by id', async () => {
    const response = await request(app).get(`/articles/${escapedId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.article.id).toBe(articleId);
  });
});


afterAll(async () => {
  await db.end();
});