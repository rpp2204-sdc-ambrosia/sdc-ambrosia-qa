const chai = require('chai'),
  expect = chai.expect;
const db = require('../db/db.js');
const app = require('../server/server.js');
const request = require('supertest');

describe('Test Root Path', () => {
  it("GETS successfully with the root path '/'", async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).to.equal(200);
  });
});

describe('/qa/questions', () => {
  it("Should return 200 status code", async () => {
      const response = await request(app).get('/qa/questions/6');
      expect(response.statusCode).to.equal(200);
  });

  it("Should return 2 questions for product id 6", async () => {
      const response = await request(app).get('/qa/questions/6');
      expect(response._body.length).to.equal(2);
  });

  it("Should return questions in the proper form", async () => {
    const response = await request(app).get('/qa/questions/6');
    expect(response._body[0]).to.have.all.keys('product_id', 'question_id', 'question_body', 'to_timestamp', 'asker_name', 'asker_email', 'reported', 'question_helpfulness');
});
});

describe('/qa/questions/answers', () => {
  it("Should return 3 answers for question id of 70", async () => {
      const response = await request(app).get('/qa/questions/70/answers');
      expect(response._body.length).to.equal(3);
  });
});

describe('POST /qa/questions', () => {
  it("Should successfully post a question", async () => {
      const question = {
        'body': 'Asking a question?',
        'name': 'Bob Jones',
        'email': 'bob@jones.com',
        'product_id': 5
      }
      const response = await request(app)
                               .post('/qa/questions')
                               .send(question)
                               .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(201);
  });
});

describe('POST /qa/questions/answers', () => {
  it("Should successfully post an answer", async () => {
      const answer = {
        'body': 'answering a question',
        'name': 'Bob Jones',
        'email': 'bob@jones.com',
        'photos': ["https://unsplash.com/photos/164_6wVEHfI"]
      }
      const response = await request(app)
                               .post('/qa/questions/60/answers')
                               .send(answer)
                               .set('Accept', 'application/json');
      expect(response.statusCode).to.equal(201);
  });
});

describe('PUT qa/questions/helpful', () => {
  it("Should successfully increase question helpfulness", async () => {
      const response = await request(app).put('/qa/questions/60/helpful')
      expect(response.statusCode).to.equal(204);
  });
});

describe('PUT qa/questions/report', () => {
  it("Should successfully report a question", async () => {
      const response = await request(app).put('/qa/questions/60/report')
      expect(response.statusCode).to.equal(204);
  });

});

describe('PUT qa/answers/helpful', () => {
  it("Should successfully increase answer helpfulness", async () => {
      const response = await request(app).put('/qa/answers/60/helpful')
      expect(response.statusCode).to.equal(204);
  });
});

describe('PUT qa/answers/report', () => {
  it("Should successfully report an answer", async () => {
      const response = await request(app).put('/qa/answers/60/report')
      expect(response.statusCode).to.equal(204);
  });
});

