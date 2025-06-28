import React from 'react';
import LoginPage from './LoginPage';
import './App.css';
import Counter from './usestate';
import Game from './chickenbanana';

function App() {
  return (
    <div className="App">
        <Game />
    </div>
  );
}

/*function Welcome(props) {
  return <h2>Welcome, {props.name}!</h2>
}

function App() {
  return (
    <div>
      <Welcome name = "Gab" />
      <Welcome name = "Gian" />
      <Welcome name = "Marc bakla" />
    </div>
  )
}*/

export default App;
