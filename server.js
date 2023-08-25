const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let cookieParse = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());
app.use(cookieParse());

mongoose.connect('mongodb://127.0.0.1/mern_recording_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Database');
});

app.use('/api/auth', require('./routers/auth'));
app.use('/api/recordings', require('./routers/recordings'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});