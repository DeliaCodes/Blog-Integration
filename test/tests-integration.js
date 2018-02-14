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

  for (let i = 1; i <= 10; i++) {
    seedData.push(generateBlogPostData());
  }
  return BlogPost.insertMany(seedData);
};

const generateBlogPostData = () => {
  return {
    //come back to this
    title: faker.title,
    content: faker.lorem,
    author: faker.author
  };
};

const tearDownDb = () => {
  console.warn('Deleting Database');
  return mongoose.connection.dropDatabase();
};
