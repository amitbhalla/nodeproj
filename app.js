import express from 'express';

//  Base config
const PORT = 3000;
const ADDR = '0.0.0.0';
const app = express();

//  Routs
app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello World!');
});

//  Event loop
app.listen(PORT, ADDR, () => console.log(`listening to ${PORT} on ${ADDR}`));
