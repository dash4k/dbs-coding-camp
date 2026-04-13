import util from 'util';

if (typeof util.isNullOrUndefined === 'undefined') {
  util.isNullOrUndefined = (value) => value === null || value === undefined;
}

import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
