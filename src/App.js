import React from 'react';
import MainPage from './components/MainPage';
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
