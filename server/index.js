/**
 * This is just a basic express nodejs server
 */
import express from 'express';
const app = express();
const port = "7000";
import routes from './routes.js';
import cors from 'cors';

// Use cors to allow all access
app.use(cors({origin: '*'}));

// APIs
app.get('*', routes);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
