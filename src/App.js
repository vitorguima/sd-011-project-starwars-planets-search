import React, { useContext } from 'react';
import './App.css';
import { Planet } from './context/Planet';
import useFetch from './hooks/useFetch';

function App() {
  useFetch();
  const { data } = useContext(Planet);
  console.log(data);
  return (
    <span>Hello, App!</span>
  );
}

export default App;
