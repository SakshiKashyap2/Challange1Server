const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Home route is created');
});

const noteSchema = {
  title: String,
  content: String,
};

const Note = mongoose.model('Note', noteSchema);

app.post('/Notes', function (req, res) {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save();
  res.send('Posted');
  console.log(req.body);
});

app.post('/Search', function (req, res) {
  const data = Note.find({ title: req.body.title });
  data
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/DeleteById', function (req, res) {
  const data = Note.deleteOne({ _id: req.body._id });
  data
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/GetAllPost', function (req, res) {
  const data = Note.find({});
  data
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch('/UpdateById', (req, res) => {
  const data = Note.updateOne({ _id: req.body._id }, { title: req.body.title });
  data
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
const port = 5000 || process.env.PORT;
app.listen(port, function () {
  console.log('Server started on port:', port);
});
