import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import { AuthProvider } from './providers/auth';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Table />
    </AuthProvider>
  );
}

export default App;
