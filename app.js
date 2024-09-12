const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./routes');
const { STATIC_PATH } = require('./constants');

const app = express();

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(
  errorHandlers.multerErrorHandler,
  errorHandlers.dbErrorHandler,
  errorHandlers.errorHandler
);

module.exports = app;
