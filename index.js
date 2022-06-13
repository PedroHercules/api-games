import express from 'express';
import cors from 'cors';

import gameController from './controllers/gameController.js';
import userController from './controllers/userController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(gameController);
app.use(userController);

app.listen(7777, () => {
  console.log('Server is running on port 7777');
})