import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <StarWarsProvider>
      <MainPage />
    </StarWarsProvider>
  );
}

export default App;
