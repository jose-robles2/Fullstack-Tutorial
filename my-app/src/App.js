import './App.css';
import React, {useState, useEffect} from 'react'

function App() {
  const [merchants, setMerchants] = useState(false)
  
  useEffect(() => {
    getMerchant();
  }, [])

  /*
    Get merchants from the database. NodeJS hosts the database on localhost 3001 so we need to 
    make requests to that URL
  */
  function getMerchant() {
    fetch('http://localhost:3001') // this is where node is ran
    .then(response => {
      return response.text()
    })
    .then(data => {
      setMerchants(data)
    })
  }

  /*
    Allow for user input to insert new merchant into DB. We are sending info to server -> POST verb, app.post() in node's index.js
    We will be sending JSON information to the database
  */
  function createMerchant() {
    let name = prompt('Enter merchant name')
    let email = prompt('Enter merchant email')
    fetch('http://localhost:3001/merchants', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify({name, email})
    })
    .then(response => {
      return response.text()
    })
    .then(data => {
      alert(data)
      getMerchant()
    })
  }

  function deleteMerchant() {
    let id = prompt('Enter merchant id to be deleted')
    fetch('http://localhose3001/merchants/${id}', {
      method: 'DELETE', 
    })
    .then(response => {
      return response.text()
    })
    .then(data => {
      alert(data)
      getMerchant()
    })
  }

  return (
    <div>
      <h1>My app</h1>
      <div>
        {merchants ? merchants : 'There is no merchant data available'}
        <br />
        <button onClick={createMerchant}>Add merchant</button>
        <br />
        <button onClick={deleteMerchant}>Delete merchant</button>
        <br />
        <button onClick={getMerchant}> Get merchants </button>
      </div>
    </div>
  );
}

export default App;
