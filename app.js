import express from 'express';
import fs from 'fs';
import morgan from 'morgan';

//  Base config
const PORT = 3000;
const ADDR = '0.0.0.0';
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Helper functions
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-sample.json'));
const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

// Route functions
// Tour
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

// User
const getAllUsers = (req, res) => {
  res.status(200);
  res.json({ status: 200, data: { users } });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  if (user) {
    res.status(200);
    res.json({ status: 200, data: { user } });
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No user with this id exists' });
  }
};

const postNewUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  fs.writeFile('./dev-data/data/users.json', JSON.stringify(users), (err) => {
    res.status(201);
    res.json({ status: 200, data: { newUser } });
  });
};

const patchUserById = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  if (user) {
    const updatedUser = { ...user, ...req.body };
    users[id] = updatedUser;

    fs.writeFile('./dev-data/data/users.json', JSON.stringify(users), (err) => {
      res.status(201);
      res.json({ status: 201, data: { updatedUser } });
    });
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No user with this id exists' });
  }
};

const deleteUserById = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  if (user) {
    const newUsers = users.filter((el) => {
      return el != user;
    });

    fs.writeFile(
      './dev-data/data/users.json',
      JSON.stringify(newUsers),
      (err) => {
        res.status(200);
        res.json({ status: 200, data: { newUsers } });
      }
    );
  } else {
    res.status(404);
    res.json({ status: 404, data: 'No user with this id exists' });
  }
};

// Routes
// Tour
app.route('/api/v1/tours').get(getAllTours).post(postNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

//  User
app.route('/api/v1/users').get(getAllUsers).post(postNewUser);
app
  .route('/api/v1/users/:id')
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
