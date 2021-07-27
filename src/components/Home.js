import React, { useEffect, useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from './Table';

const collumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const order = [
  'name',
  'climate',
  'created',
  'diameter',
  'edited',
  'gravity',
  'orbital_period',
  'population',
  'rotation_period',
  'surface_water',
  'terrain',
];

const comparisons = ['maior que', 'menor que', 'igual a'];

const Home = () => {
  const { setData, filters, setFilters } = useContext(PlanetsContext);
  const [column, setColumn] = useState(collumns[0]);
  const [comparison, setComparison] = useState(comparisons[0]);
  const [value, setValue] = useState(0);
  const [orderCol, setOrderCol] = useState('name');
  const [orderDir, setOrderDir] = useState('ASC');

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

  const valueFilter = async (event) => {
    event.preventDefault();
    const { filterByNumericValues: byNumber } = filters;
    const newFilter = {
      column,
      comparison,
      value,
    };
    await setFilters({ ...filters, filterByNumericValues: [...byNumber, newFilter] });
    const colSelect = document.querySelector('#col-select').value;
    setColumn(colSelect);
  };

  const setOrder = (event) => {
    event.preventDefault();
    const newFilter = {
      column: orderCol,
      sort: orderDir,
    };
    setFilters({ ...filters, order: newFilter });
  };

  const renderColumns = () => {
    const { filterByNumericValues: byNumber } = filters;
    return (collumns.map((col) => {
      const inUse = byNumber.find(((filt) => col === filt.column));
      if (!inUse) {
        return <option key={ col } value={ col }>{ col }</option>;
      }
      return '';
    }));
  };

  const renderFilters = () => {
    const { filterByNumericValues: byNumber } = filters;
    return byNumber.map((filt, i) => (
      <div key={ filt.column } data-testid="filter">
        <span>{ `${filt.column} ${filt.comparison} ${filt.value}` }</span>
        <button
          type="submit"
          onClick={ async (event) => {
            event.preventDefault();
            byNumber.splice(i, 1);
            await setFilters(({ ...filters, filterByNumericValues: byNumber }));
            const colSelect = document.querySelector('#col-select').value;
            setColumn(colSelect);
          } }
        >
          X
        </button>
      </div>
    ));
  };

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
            id="col-select"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            { renderColumns() }
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setComparison(target.value) }
          >
            {comparisons.map((com) => <option key={ com } value={ com }>{ com }</option>)}
          </select>
          <input
            type="number"
            data-testid="value-filter"
            onChange={ ({ target }) => setValue(target.value) }
          />
          <button
            type="submit"
            data-testid="button-filter"
            onClick={ valueFilter }
          >
            Filtrar
          </button>
        </fieldset>
        <fieldset>
          <legend>Ordenar:</legend>
          <select
            data-testid="column-sort"
            onChange={ ({ target }) => setOrderCol(target.value) }
          >
            {order.map((or) => <option key={ or } value={ or }>{ or }</option>)}
          </select>
          <label htmlFor="asc">
            <input
              type="radio"
              id="asc"
              name="ord_dir"
              value="ASC"
              data-testid="column-sort-input-asc"
              defaultChecked
              onChange={ ({ target }) => setOrderDir(target.value) }
            />
            ASC
          </label>
          <label htmlFor="desc">
            <input
              type="radio"
              id="desc"
              name="ord_dir"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target }) => setOrderDir(target.value) }
            />
            DESC
          </label>
          <button
            type="submit"
            data-testid="column-sort-button"
            onClick={ setOrder }
          >
            Ordenar
          </button>
        </fieldset>
        { renderFilters() }
      </form>
      <Table />
    </div>
  );
};

export default Home;
