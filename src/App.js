import React, { useEffect, useState } from 'react';
import Table from './components/table';

const App = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setPlanets(data.results);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table planets={ planets } />
  );
};
// (alias) const App: () => JSX.Element
export default App;
