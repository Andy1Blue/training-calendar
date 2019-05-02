import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import ListOfMonths from './components/ListOfMonths';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Workout analizer
        </p>
      </header>

     <ListOfMonths/>

    </div>
  );
}

export default App;
