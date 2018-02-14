"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect;
chai.use(chaiHttp);

const {
  BlogPost
} = require('../models');
const {
  app,
  runServer,
  closeServer
} = require('../server');
const {
  TEST_DATABASE_URL
} = require('../config');

const seedBlogData = () => {
  const seedData = [];

  //convert this to map
  for (let i = 1; i <= 10; i++) {
    seedData.push(generateBlogPostData());
  }
  return BlogPost.insertMany(seedData);
};

const generateBlogPostData = () => {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    author: faker.name.findName()
  };
};

const tearDownDb = () => {
  console.warn('Deleting Database');
  return mongoose.connection.dropDatabase();
};

describe('Blog Post API Resource', () => {

  before(() => {
    runServer(TEST_DATABASE_URL);
  });
  beforeEach(() => {
    seedBlogData();
  });

  afterEach(() => {
    tearDownDb();
  });
  after(() => {
    closeServer();
  });
});

describe('GET endpoint', () => {
  it('return existing blog posts', () => {
    let res;
    return chai.request(app)
      .get('/blog-posts')
      .then((_res) => {
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body.blog - posts).to.have.length.of.at.least(1);
        return BlogPost.count();
        .then((count) => {
          expect(res.body.blog - posts).to.have.length.of(count);
        });
      });
  });
});
