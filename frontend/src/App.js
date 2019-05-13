// Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import ListOfMonths from './components/ListOfMonths';
import GoogleLogin from './components/GoogleLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Training calendar
          <div>
            <GoogleLogin />
          </div>
        </div>
      </header>
      <ListOfMonths />
    </div>
  );
}

export default App;
