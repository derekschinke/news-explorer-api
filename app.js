const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;

const app = express();

const mongodbUri = 'mongodb://localhost:27017/newsdb';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
