import Express, { json } from 'express';
var app = Express();
import cors from 'cors';
import router from './router';
app.use(cors());
app.use(json());
app.use(router);
export default app;
