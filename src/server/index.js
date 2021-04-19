const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const expenseGroupRoutes = require('./routes/expenseGroups');

const port = process.env.PORT || 9000;
const app = express();

dotenv.config();

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
} catch (err) {
  console.log(err);
}

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('dist'));

app.use('/api/user', authRoutes);
app.use('/api/expenseGroups', expenseGroupRoutes);

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
