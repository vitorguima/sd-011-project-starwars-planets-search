import React from 'react';
import './App.css';
import { AppContextProvider } from './contexts/AppContext';
import Home from './pages/Home';

function App() {
  return (
    <div className="back">
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </div>
  );
}

export default App;
