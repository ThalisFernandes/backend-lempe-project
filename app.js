const express = require('express')
const cors = require('cors')
const app = express()
const instrumentoRoutes = require('./routes/instrumentos')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.get('/api/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

instrumentoRoutes(app);

app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 8000')
})