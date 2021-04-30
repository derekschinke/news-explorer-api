const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const router = require('./routes/index');

const { limiter, speedLimiter } = require('./middleware/limiters');
const { requestLogger, errorLogger } = require('./middleware/logger');

dotenv.config();

const { PORT = 3000 } = process.env;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.listen(process.env.PORT || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
