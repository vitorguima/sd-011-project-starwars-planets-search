import React, { useContext } from 'react';
import './App.css';
// import { Planet } from './context/Planet';
import useFetch from './hooks/useFetch';

function App() {
  // const { data } = useContext(Planet);
  useFetch();

  return (
    <span>Hello, App!</span>
  );
}

export default App;
