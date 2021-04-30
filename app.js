const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const { limiter, speedLimiter } = require('./middleware/limiters');
const { requestLogger, errorLogger } = require('./middleware/logger');

dotenv.config();

const { PORT = 3001 } = process.env;

const app = express();

const mongodbUri = 'mongodb://localhost:27017/newsdb';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.set('trust proxy', 1);
app.use(limiter);
app.enable('trust proxy');
app.use(speedLimiter);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(errorLogger);

app.listen(process.env.PORT || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
