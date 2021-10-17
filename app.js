import express from 'express';
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

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (tour) {
    res.status(200);
    res.json({ status: 200, data: { tour } });
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No tour with this id exists' });
  }
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

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (tour) {
    const updatedTour = { ...tour, ...req.body };
    tours[id] = updatedTour;

    fs.writeFile(
      './dev-data/data/tours-sample.json',
      JSON.stringify(tours),
      (err) => {
        res.status(201);
        res.json({ status: 201, data: { updatedTour } });
      }
    );
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No tour with this id exists' });
  }
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (tour) {
    const newtours = tours.filter((el) => {
      return el != tour;
    });

    fs.writeFile(
      './dev-data/data/tours-sample.json',
      JSON.stringify(newtours),
      (err) => {
        res.status(200);
        res.json({ status: 200, data: { newtours } });
      }
    );
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No tour with this id exists' });
  }
});

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
