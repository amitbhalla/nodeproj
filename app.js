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

// Route functions
const getAllTours = (req, res) => {
  res.status(200);
  res.json({ status: 200, data: { tours } });
};

const getTourById = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (tour) {
    res.status(200);
    res.json({ status: 200, data: { tour } });
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No tour with this id exists' });
  }
};

const postNewTour = (req, res) => {
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
};

const patchTourById = (req, res) => {
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
};

const deleteTourById = (req, res) => {
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
};

//  Routes
app.route('/api/v1/tours').get(getAllTours).post(postNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
