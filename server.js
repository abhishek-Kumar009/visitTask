const express = require('express');

const bodyPareser = require('body-parser');

const userRoute = require('./routes/user');

var app = express();
app.use(bodyPareser.json());
app.use('/user', userRoute);


app.listen(3000, () => console.log("Listening on port 3000..."));