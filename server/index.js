import Express, { json } from 'express';
const app = Express();

import cors from 'cors';
import router from './router.js';

const PORT = process.env.PORT;


app.use(cors());
app.use(json());
app.use(router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}! 🚀`));