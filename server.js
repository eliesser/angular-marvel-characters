const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

const PORT = 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const apikey = process.env.PUBLIC_API_KEY_MARVEL;
const apikeyPrivate = process.env.PRIVATE_API_KEY_MARVEL;
const ts = new Date().getTime().toString();
const hash = crypto
  .createHash('md5')
  .update(ts + apikeyPrivate + apikey)
  .digest('hex');
const MARVEL_API_BASE_URL = 'http://gateway.marvel.com/v1/public';
const LOCAL_BASE_URL = 'http://localhost';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  var whiteList = ['*', `${LOCAL_BASE_URL}:4200`];
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

  if (NODE_ENV === 'mock') {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading data' });
      }
      try {
        let characters = JSON.parse(data).characters;
        if (nameStartsWith)
          characters.data.results = characters.data.results.filter(character =>
            character.name.toLowerCase().startsWith(nameStartsWith.toLowerCase())
          );

        res.json(characters);
      } catch (parseError) {
        res.status(500).json({ error: 'Error parsing data' });
      }
    });
  } else {
    const params = {
      ts,
      hash,
      apikey,
    };

    if (nameStartsWith)
      params.nameStartsWith = nameStartsWith

    axios.get(`${MARVEL_API_BASE_URL}/characters`, {
      params
    })
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
});

app.get('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (NODE_ENV === 'mock') {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading data' });
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
  } else {
    const params = {
      ts,
      hash,
      apikey,
    };

    axios.get(`${MARVEL_API_BASE_URL}/characters/${id}`, {
      params
    })
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
});

app.get('/characters/:id/comics', (req, res) => {
  const id = req.params.id;

  if (NODE_ENV === 'mock') {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading data' });
      }
      try {
        const db = JSON.parse(data);
        res.json(db.comics);
      } catch (parseError) {
        res.status(500).json({ error: 'Error parsing data' });
      }
    });
  } else {
    const params = {
      ts,
      hash,
      apikey,
    };

    axios.get(`${MARVEL_API_BASE_URL}/characters/${id}/comics`, {
      params
    })
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${LOCAL_BASE_URL}:${PORT}`);
});
