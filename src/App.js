import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Main from './pages/Main';

function App() {
  return (
    <StarWarsProvider>
      <Main />
    </StarWarsProvider>
  );
}

export default App;
