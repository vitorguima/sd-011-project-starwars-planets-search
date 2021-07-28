import React from 'react';
import './App.css';
import { AppContextProvider } from './AppContext';
import Home from './pages/Home';

function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}

export default App;
