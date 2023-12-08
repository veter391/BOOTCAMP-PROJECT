// import http from 'node:http'
import dotenv from 'dotenv';
import chalk from 'chalk';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import { UploadedFile } from 'express-fileupload';
import userRouter from './src/routes/usersRoutes.js';
import commentRouter from './src/routes/commentsRoutes.js';
import eventRouter from './src/routes/eventsRoutes.js';
import searchRouter from './src/routes/searchRoutes.js'


dotenv.config({ path: '../.env' });

const PORT = +process.env.PORT || 5000;
// colors to diferent messages
const error = chalk.bold.red;
const ok = chalk.bold.green;
const warning = chalk.hex('#FFA500'); // orange
const serverInit = chalk.bold.bgRed;

const app = express();

app.use(morgan('dev'));
// N: permit to use json and text for requests
app.use(express.json());
app.use(express.text());

// N: if you want to upload file to server!
// app.use(UploadedFile())

// ::: N: alloweed to share data between front&back
const corsOptions = {}; // N: justone path { origin: 'http://exemple.com' }
app.use(cors(corsOptions));
// :::

// Jose: Router to user routes
app.use('/users', userRouter);

//Jose: Router to comments routes
app.use('/comments', commentRouter);

//Jose: Router to events routes
app.use('/events', eventRouter);

//Jose: Router to search routes
app.use('/search', searchRouter);

// if the path doesn't exist
// ! this use should be the last one after the others paths !
app.use('*', (req, res) => res.status(404).send({
  message: 'Error path not found'
}));

// listen to server
app.listen(PORT, () => console.log(serverInit(` Server started on port ${PORT} `)));
