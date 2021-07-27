import React from 'react';
import Table from './components/Table';
import Navbar from './components/Navbar';
import './App.css';
import { AppProvider } from './context';

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <Table />
    </AppProvider>
  );
}
