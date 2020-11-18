const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');

const port = process.env.PORT || 9000;
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('dist'));

app.use('/api', routes);

app.get('/:type(dashboard|login)', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'), (error) => {
    if (error) {
      res.status(500).send(error);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port:', port);
});
