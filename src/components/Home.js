import React, { useEffect, useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from './Table';

const collumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'
];

const comparisons = ['maior que', 'menor que', 'igual a'];

const Home = () => {
  const { setData, filters, setFilters } = useContext(PlanetsContext);
  const [column, setColumn] = useState(collumns[0]);
  const [comparison, setComparison] = useState(comparisons[0]);
  const [value, setValue] = useState(0);

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

  const valueFilter = (event) => {
    event.preventDefault();
    const { filterByNumericValues: byNumber } = filters;
    const newFilter = {
      column,
      comparison,
      value,
    }
    setFilters({ ...filters, filterByNumericValues: [...byNumber, newFilter] });
  }
  
  return (
    <div>
      <span>Olá</span>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ nameFilter }
        />
        <fieldset>
          <legend>Filtrar por valor:</legend>
          <select
            data-testid="column-filter"
            onChange={({target}) => setColumn(target.value)}
          >
            {collumns.map((col) => <option key={ col } value={ col }>{ col }</option>)}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={({target}) => setComparison(target.value)}
          >
            {comparisons.map((com) => <option key={ com } value={ com }>{ com }</option>)}
          </select>
          <input
            type="number"
            data-testid="value-filter"
            onChange={({target}) => setValue(target.value)}
          />
          <button
            data-testid="button-filter"
            onClick={ valueFilter }
          >
            Filtrar
          </button>
        </fieldset>
      </form>
      <Table />
    </div>
  );
};

export default Home;
