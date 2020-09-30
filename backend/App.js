const express = require('express');
const multer = require('multer');
const path = require('path');
const globalErrorController = require('./controllers/globalErrorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const deliveryRouter = require('./routes/deliveryRoutes');
const stopRoutes = require('./routes/stopRoutes');
const watsonRouter = require('./routes/watson');
const uniqid = require('uniqid');

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uniqid('', `-${file.originalname}`));
  },
});

const fileFilter = (req, file, cb) => {
  console.log('filter');
  console.log(file);
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/PNG' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('file'));
app.use('/api/v1/images', express.static(path.join(__dirname, 'images')));

app.use('/api/v1/watson', watsonRouter);
app.use('/api/v1/delivery', deliveryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/stops', stopRoutes);

app.use('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);

module.exports = app;
