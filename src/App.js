import React from 'react';
import Table from './components/Table';
import './App.css';
import { AppProvider } from './context';

export default function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}
