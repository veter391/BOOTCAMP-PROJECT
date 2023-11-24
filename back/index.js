import http from 'node:http'
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({ path: '../.env' });

const
  PORT = +process.env.PORT || 5000,
// colors to diferent messages
  error = chalk.bold.red,
  ok = chalk.bold.green,
  warning = chalk.hex('#FFA500'), // orange
  serverInit = chalk.bold.bgRed

http.createServer((req, res) => {
  res.end();
}).listen(PORT, () => console.log(serverInit(` Server started on port ${PORT} `)))
