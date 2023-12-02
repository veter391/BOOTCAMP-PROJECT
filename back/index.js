// import http from 'node:http'
import dotenv from 'dotenv';
import chalk from 'chalk';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import { UploadedFile } from 'express-fileupload';

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

// todo N: log in and other requests... MOVE TO SEPARATE FILE!
app.use('/users/login', (req, res) => {
  console.log(req.body, ok('=> new login data'));
  res.status(200).send(req.body);
});

app.use('/users/register', (req, res) => {
  console.log(req.body, ok('=> new registered user'));
  res.status(200).send(req.body);
});

// if the path doesn't exist
// ! this use should be the last one after the others paths !
app.use('*', (req, res) => res.status(404).send({
  message: 'Error path not found'
}));

// listen to server
app.listen(PORT, () => console.log(serverInit(` Server started on port ${PORT} `)));
