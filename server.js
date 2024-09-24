const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const eventRouter = require('./routes/events');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/api', apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/weather/loc', (req, res) => {
  const { lat, lng } = req.query;
  res.json({ lat, lng, weather: 'sunny' });
});

app.get('/api/api/weather/loc/', (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  res.json({ message: `Coordinates: ${lat}, ${lng}` });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`);
});
