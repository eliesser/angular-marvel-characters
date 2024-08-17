const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

  var whiteList = [
    '*',
    'http://localhost:4200'
  ];

  var origen = req.headers.origin;

  if (whiteList.indexOf(origen) >= -1) {
    res.header('Access-Control-Allow-Origin', origen);
  }

  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.get('/characters', (req, res) => {
  const nameStartsWith = req.query.nameStartsWith || '';

  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading data' });
    }
    try {
      let characters = JSON.parse(data).characters;

      if (nameStartsWith) {
        characters.data.results = characters.data.results.filter(character =>
          character.name.toLowerCase().startsWith(nameStartsWith.toLowerCase())
        );
      }

      res.json(characters);
    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

app.get('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading data' });
    }
    try {
      const db = JSON.parse(data);
      db.characters.data.results = db.characters.data.results.filter(c => c.id === id);
      if (db.characters.data.results.length) {
        res.json(db.characters);
      } else {
        res.status(404).json({ error: 'Character not found' });
      }
    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

app.get('/characters/:id/comics', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error reading data' });
    }
    try {
      const db = JSON.parse(data);
      res.json(db.comics);
    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});