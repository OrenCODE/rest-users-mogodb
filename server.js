const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Api Routes
const customer = require('./routes/api/customer');

// Express
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5005;

// Use Routes
app.use('/api/customer', customer);

// Static assets
// app.use(express.static(path.join(__dirname, 'public')));

// Listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
