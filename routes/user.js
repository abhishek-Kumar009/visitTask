const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../connection');
const fs = require('fs');
const multer = require('multer');
const fastcsv = require('fast-csv');
const validateData = require('../validateData');

const upload = multer({
  dest: 'tmp/csv/'
});

Router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * from userInfo', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      res.send('Error fetching the database!');
      console.log(err);
    }
  });
});

Router.post('/', upload.single('file'), (req, res) => {
  try {

    //Check whether the file is uploaded or not
    if (req.file) {
      let csvData = [];
      fastcsv
        .parseFile(req.file.path)
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('end', () => {
          csvData.shift();

          //Validate the data before entering into the database
          const validationError = validateData(csvData);
          if (validationError) {
            res.status(403).json({
              error: validationError
            });

          } else {
            query =
              'INSERT INTO userInfo (id, name, date, steps, calories) VALUES ?';
            mysqlConnection.query(query, [csvData], (err, response) => {
              if (!err) {
                // res.send('Records were added successfully!', response);
                console.log('Records added succesfully!', response);
              } else {
                console.log('Error:', err);
              }
            });

          }
          fs.unlinkSync(req.file.path);
        });
      res.status(200).send('Records were successfully entered!');
    } else {
      res.send('File not found!');
    }
  } catch (error) {
    console.log('Error:', error);
  }
});

module.exports = Router;