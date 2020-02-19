'use strict';
require('dotenv').config();

const shema = process.env.DB_SCHEMA;
const host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const environment = process.env.NODE_ENV;
const port = process.env.PORT || 8081;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const seed = process.env.SEED;

const generateUrlDB = () => {
  let url = '';
  if (environment != 'PROD') {
    url = `mongodb://${host}:${db_port}/${shema}`;
  } else {
    url = `mongodb+srv://${db_user}:${db_password}@cluster0-2vgr1.mongodb.net/${shema}?retryWrites=true&w=majority`;
  }
  return url;
};

const config = {
  port,
  shema,
  host,
  db_port,
  environment,
  generateUrlDB,
  seed
};

module.exports = config;
