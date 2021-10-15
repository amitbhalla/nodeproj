import express from 'express';
import { response } from 'express';
import fs from 'fs';

//  Base config
const PORT = 3000;
const ADDR = '0.0.0.0';
const app = express();

// Middleware
app.use(express.json());

// Helper functions
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-sample.json'));

//  Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200);
  res.json({ status: 200, data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-sample.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201);
      res.json({ status: 200, data: { newTour } });
    }
  );
});

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
