import React, { useEffect, useContext } from 'react';
import './App.css';
import { Planet } from './context/Planet';

function App() {
  const { setData, data, fetchData } = useContext(Planet);

  useEffect(() => {
    const getData = async () => {
      const dataReceived = await fetchData();
      setData(dataReceived);
    };
    getData();
  }, []);

  console.log(data);
  return (
    <span>Hello, App!</span>
  );
}

export default App;
