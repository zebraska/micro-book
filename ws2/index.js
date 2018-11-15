const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const bodyParser = require('body-parser')
const app = express()
const connectionString = 'postgresql://ws2:passwd2@localhost:5432/service';
const baseUri = '/api/v1/emprunt'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/* insert */
app.post(baseUri, (req, res) => {
    const results = [];
    // Grab data from http request
    console.log(req.body)
    const data = { id: req.body.id, nom: req.body.nom, prenom: req.body.prenom, livre: req.body.livre };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO public."Emprunt"(id, nom, prenom, livre_id) VALUES ($1, $2, $3, $4);',
            [data.id, data.nom, data.prenom, data.livre]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM public."Emprunt"');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

/* read */
app.get(baseUri, (req, res) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM public."Emprunt";');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

/* UPDATE */
app.put(baseUri+':id', (req, res) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.id;
    // Grab data from http request
    const data = { nom: req.body.nom, prenom: req.body.prenom, livre: req.body.livre };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Update Data
        client.query('UPDATE public."Emprunt" SET nom=($1), prenom=($2), livre=($3) WHERE id=($4)',
            [data.nom, data.prenom, data.livre, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM public.\"Emprunt\"");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

/* DELETE */
app.delete(baseUri+':id', (req, res) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.todo_id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Delete Data
      client.query('DELETE FROM public."Emprunt" WHERE id=($1)', [id]);
      // SQL Query > Select Data
      var query = client.query('SELECT * FROM public."Emprunt"');
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  });


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
