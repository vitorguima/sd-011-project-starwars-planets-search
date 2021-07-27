import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import Search from './Search';

function Table() {
  const data = useContext(MyContext);
  const [search, setSearch] = useState('');
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [random, setRandom] = useState({
    column: 'population', comparison: '', value: '' });
  const [columns, setColumn] = useState([]);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });

  useEffect(() => {
    if (data) setPlanetsFiltered(data);
  }, [data]);

  useEffect(() => {
    setColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, []);

  if (data.length === 0) return <p>Loading</p>;

  function toSearchInput({ target }) {
    setSearch({
      filters: {
        ...filters.filters,
        filterByName: { name: target.value } },
    });
    setPlanetsFiltered(data.filter((planet) => planet.name.includes(target.value)));
  }

  function randomState({ target }) {
    const { name, value } = target;
    setRandom({
      ...random,
      [name]: value,
    });
  }

  const getRandom = planetsFiltered.filter((value) => {
    const { filterByNumericValues } = filters.filters;

    if (filterByNumericValues.length > 0) {
      const randomValues = filterByNumericValues[filterByNumericValues.length - 1];
      switch (randomValues.comparison) {
      case 'maior que':
        return Number(value[randomValues.column]) > Number(randomValues.value);
      case 'menor que':
        return Number(value[randomValues.column]) < Number(randomValues.value);
      case 'igual a':
        return Number(value[randomValues.column]) === Number(randomValues.value);
      default: return true;
      }
    } return true;
  }) || data;

  function handleClickButton() {
    const { column, comparison, value } = random;
    setFilters({
      filters: {
        ...filters.filters.filterByName,
        filterByNumericValues: [...filters.filters.filterByNumericValues,
          { column, comparison, value }] },
    });
    setColumn(columns.filter((values) => values !== column));
  }

  return (
    <div>
      <Search
        name={ search }
        handleChange={ toSearchInput }
        handleChangeFilter={ randomState }
        handleClick={ handleClickButton }
        columns={ columns }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {getRandom.map((element, index) => (
            <tr key={ index }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>
                {element.films
                  .map((film, position) => <li key={ position }>{film}</li>)}
              </td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
Table.contextType = MyContext;
