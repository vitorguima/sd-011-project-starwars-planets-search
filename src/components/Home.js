import React, { useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from './Table';

const Home = () => {
  const { setData, filters, setFilters } = useContext(PlanetsContext);

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

  const nameFilter = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
  };

  return (
    <div>
      <span>Olá</span>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ nameFilter }
      />
      <Table />
    </div>
  );
};

export default Home;
