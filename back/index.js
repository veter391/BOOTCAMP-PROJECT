import http from 'node:http'
import dotenv from 'dotenv';
import chalk from 'chalk';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from '../back/src/routes/usersRoutes.js'

dotenv.config({ path: '../.env' });

const
  PORT = +process.env.PORT || 5000,
// colors to diferent messages
  error = chalk.bold.red,
  ok = chalk.bold.green,
  warning = chalk.hex('#FFA500'), // orange
  serverInit = chalk.bold.bgRed

const app = express()

app.use(morgan('dev'))
// permit to use json for requests
app.use(express.json())
// alloweed to share data between front&back
app.use(cors({ origin: `http://localhost:${PORT}` }))

//Router to user routes
app.use('/users/', userRouter);

// if the path doesn't exist
// ! this use should be the last one after the others paths !
app.use('*', (req, res) => res.status(404).send('Error path not found'));




// listen to server
app.listen(PORT, () => console.log(serverInit(` Server started on port ${PORT} `)))
