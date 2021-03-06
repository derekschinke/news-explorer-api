const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const router = require('./routes/index');

const { limiter, speedLimiter } = require('./middleware/limiters');
const { requestLogger, errorLogger } = require('./middleware/logger');

const serverErrorHandler = require('./utils/serverErrorHandler');
const NotFoundError = require('./errors/NotFoundError');

dotenv.config();

const { MONGO_SECRET, NODE_ENV, PORT = 3001 } = process.env;

const app = express();

const mongodbUri =
  NODE_ENV === 'production'
    ? `mongodb+srv://derekschinke:${MONGO_SECRET}@practicum.0zhvm.mongodb.net/newsdb?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/newsdb';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) =>
  next(new NotFoundError('Requested resource not found'))
);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  serverErrorHandler(err, res);
});

app.listen(process.env.PORT || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
