import React, { useContext, useEffect, useState } from 'react';
import starWarsContex from '../context/starWarsContex';

export default function Table() {
  const data = useContext(starWarsContex);
  const [filters, setfilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const [filtered, setfitered] = useState([]);

  const [DataColumns] = useState(
    ['population', 'orbital_period', 'rotation_period', 'surface_water', 'diameter'],
  );

  const [filterByNumericValues, setfilterByNumericValues] = useState(
    {
      column: 'population',
      comparison: '',
      value: '100000',
    },
  );

  useEffect(() => {
    function filterData() {
      let newArray = data;
      if (newArray.length > 0 && filters.filterByName.name) {
        newArray = newArray
          .filter((item) => item.name.toLowerCase()
            .includes(filters.filterByName.name.toLowerCase()));
      }
      setfitered(newArray);
    }
    filterData();
  },
  [data, filters]);

  const handleInputName = ({ target: { value } }) => {
    setfilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const filteredByComparison = () => {
    const { column, comparison, value } = filterByNumericValues;
    switch (comparison) {
    case 'maior que':
      return setfitered(filtered.filter((planet) => planet[column] > Number(value)));
    case 'menor que':
      return setfitered(filtered.filter((planet) => planet[column] < Number(value)));
    case 'igual a':
      return setfitered(filtered.filter((planet) => planet[column] === value));
    default:
      return filtered;
    }
  };
  return (
    <>
      <input
        type="text"
        onChange={ (e) => handleInputName(e) }
        data-testid="name-filter"
      />
      <form>
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              column: target.value,
            })) }
          >
            {DataColumns.map((column, index) => (
              <option key={ index } value={ column }>{ column }</option>)) }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              comparison: target.value,
            })) }
          >
            <option value="" defaultValue>Selecione sua opção</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            data-testid="value-filter"
            id="value"
            name="value"
            onChange={ ({ target }) => (setfilterByNumericValues({
              ...filterByNumericValues,
              value: target.value,
            })) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          name="add-filter"
          onClick={ filteredByComparison }
        >
          Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>created</th>
            <th>diameter</th>
            <th>edited</th>
            <th>films</th>
            <th>gravity</th>
            <th>climate</th>
            <th>orbital_period</th>
            <th>population</th>
            <th>rotation_period</th>
            <th>surgace_water</th>
            <th>terrain</th>
            <th>url</th>
          </tr>
        </thead>
        {filtered.map((planet, index) => (
          <tbody key={ index }>
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.created }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.films.map((film, i) => (<p key={ i }>{ film }</p>))}</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.population }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.url }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
