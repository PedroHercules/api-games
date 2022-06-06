import express from 'express';
import cors from 'cors';

import { routes } from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(routes)


app.listen(7777, () => {
  console.log('Server is running on port 7777');
})