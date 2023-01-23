// This file utilizes the `pg` library - allows node app to talk with postgres

// Input information - these fields come from when we created the DB in psql 
// Create Pool object - allows for querying into the DB its connected to 

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user', 
  host: 'localhost', 
  database: 'my_database', 
  password: 'a', 
  port: 5432
})

/*
  Return all merchants in the database. pool is from merchant_mode1.js, it acts as our API to the DB
  Use the DB to make a SQL query that will return all the merchants in the DB.
*/
const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/*
  Insert a new merchant into the database. pool is from merchant_mode1.js, it acts as our API to the DB
  Use the DB to make a SQL query that will insert a new merchant.
*/
const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const {name, email} = body
    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}

/*
  Delete a merchant from the database. pool is from merchant_mode1.js, it acts as our API to the DB
  Use the DB to make a SQL query that will delete a merchant.
*/
const deleteMerchant = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM merchants where id = $1', [id], (error,results) => {
      if (error) 
        reject(error)
      resolve('Merchant deleted with ID: ${id}')
    })
  })
}

// Export these functions so that they can be used
module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
}