import React from 'react';
import './App.css';
import Home from './pages/Home';
import SpacesProvider from './context/SpacesProvider';

function App() {
  return (
    <SpacesProvider>
      <Home />
    </SpacesProvider>
  );
}

export default App;
