import React, { useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from './Table';

const Home = () => {
  const { setData } = useContext(PlanetsContext);

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(url)
        .then((r) => r.json());
      results.forEach((element) => {
        delete element.residents;
      });
      setData(results);
    };

    getPlanets();
  }, []);

  return (
    <div>
      <span>Olá</span>
      <Table />
    </div>
  );
};

export default Home;
