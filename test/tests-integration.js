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
