import express from 'express';
import fs from 'fs';

const router = express.Router();

// Helper functions
const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

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

//  User
router.route('/').get(getAllUsers).post(postNewUser);
router
  .route('/:id')
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

export default router;
