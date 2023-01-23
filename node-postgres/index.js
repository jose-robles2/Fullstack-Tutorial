// Create index.js, index was specified as "main" in the package.json so this will be called when 
// node index.js is ran 
// Listen() is called first to connect to the port, then get() is ran

const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3001

// Import 
const merchant_model = require('./merchant_model')

app.use(express.json())             // Allow for incoming reqs with JSON payloads
app.use(function (req, res, next) { // Allow for requests to this app from React
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //3000 is the react localhost
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

//Below are some HTTP routes that can accept requests

// GET info from server
app.get('/', (req, res) => {
  merchant_model.getMerchants()
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

// POST - send info to server
app.post('/merchants', (req, res) => {
  merchant_model.createMerchant(req.body)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

// DELETE info from server
app.delete('/merchants/:id', (req,res) => {
  merchant_model.deleteMerchant(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

app.listen(port, () => {
  console.log('App running on port ${port}.')
})