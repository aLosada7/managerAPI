const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
//const morgan = require('morgan');
var cors = require('cors');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const teams = require('./routes/teams');
const players = require('./routes/players');
const auth = require('./routes/auth');
const users = require('./routes/users');
const competitions = require('./routes/competitions');
const report = require('./routes/report');
const games = require('./routes/games');

const app = express();

// Body parser
app.use(express.json());
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    //app.use(morgan('dev'));
}

// File upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Mount routers
app.use('/api/v1/teams', teams);
app.use('/api/v1/players', players);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/competitions', competitions);
app.use('/api/v1/report', report);
app.use('/api/v1/games', games);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow.bold)
);

// Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
})