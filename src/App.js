import React from 'react';
import MainPage from './MainPage';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <MainPage />
    </PlanetsProvider>
  );
}

export default App;
