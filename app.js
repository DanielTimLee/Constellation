const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

process
  .on('unhandledRejection', (error) => {
    console.error(`unhandledRejection ${error.stack}`);
    process.exit(1);
  })
  .on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.stack}`);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
