// const express = require('express')
// const app = express()
// const port = 3000
// var mongoose = require('mongoose');




// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))



const express = require('express')
const multer = require('multer')
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fileModel = require("./model/file")
  // setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
//const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// optional: clean all data before start
// cleanFolder(UPLOAD_PATH);

// app
const app = express();
app.use(cors());
app.use(express.static(__dirname + '/uploads'));

var mongoDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(
  mongoDB, { useCreateIndex: true, useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

mongoose.Promise = global.Promise;


app.post('/photos/upload', upload.array('photos', 12), async(req, res) => {
  try {
    fileModel.insertMany(req.files).then((docs) => {
      res.send(docs);
    });
  } catch (err) {
    res.sendStatus(400);
  }
})

app.get('/photos', async(req, res) => {
  try {
    fileModel.find({}).then((docs) => {
      res.send(docs);
    });
  } catch (err) {
    res.sendStatus(400);
  }
})

app.delete('/photos/:id', async(req, res) => {
  try {
    fileModel.findByIdAndDelete({ "_id": req.params.id }).then((docs) => {
      res.send(docs);
    });
  } catch (err) {
    res.sendStatus(400);
  }
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
})