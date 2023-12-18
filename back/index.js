// import http from 'node:http'
import dotenv from 'dotenv';
import chalk from 'chalk';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import { UploadedFile } from 'express-fileupload';
import userRouter from './src/routes/usersRoutes.js';
import postRouter from './src/routes/postsRoutes.js';
import commentRouter from './src/routes/commentsRoutes.js';
import eventRouter from './src/routes/eventsRoutes.js';
import searchRouter from './src/routes/searchRoutes.js';
import followRouter from './src/routes/followersRoutes.js';
import reactionRouter from './src/routes/reactionsRoutes.js';
import chatRouter from './src/routes/chatRoutes.js';
import errorHandler from './src/controllers/errors/errorHandler.js';

dotenv.config({ path: '../.env' });
const app = express();
const PORT = +process.env.PORT || 5000;
// colors to diferent messages
const error = chalk.bold.red;
const ok = chalk.bold.green;
const warning = chalk.hex('#FFA500'); // orange
const serverInit = chalk.bold.bgRed;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(morgan('dev'));
// N: permit to use json and text for requests
app.use(express.json());
app.use(express.text());
app.use(upload.single('avatar'));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// N: if you want to upload file to server!
// app.use(UploadedFile())

// ::: N: alloweed to share data between front&back
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
// :::

// Jose: Router to user routes
app.use('/users', userRouter);

// Jose: Router to post routes
app.use('/posts', postRouter);

// Jose: Router to comments routes
app.use('/comments', commentRouter);

// Jose: Router to events routes
app.use('/events', eventRouter);

// Jose: Router to search routes
app.use('/search', searchRouter);

// Jose: Router to follow routes
app.use('/follow', followRouter);

// Jose: Router to reactions routes
app.use('/reaction', reactionRouter);

// Jose: Router to chat routes
app.use('/chat', chatRouter);

// MIDDLEWARE FOR CHECK ERRORS
app.use(errorHandler);

// if the path doesn't exist
// ! this use should be the last one after the others paths !
app.use('*', (req, res) => res.status(404).send({
  message: 'Error path not found'
}));

// listen to server
app.listen(PORT, () => console.log(serverInit(` Server started on port ${PORT} `)));
