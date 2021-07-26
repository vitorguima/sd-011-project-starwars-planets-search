import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

export default function Table() {
  const {
    data,
    loading,
    filters,
    setFilters,
    options,
    setOptions } = useContext(StarwarsContext);

  const inputHandle = ({ target }) => {
    setFilters(
      { ...filters, filterByName: { name: target.value } },
    );
  };

  if (loading) {
    return (<h1>Loading...</h1>);
  }

  const filterPlanets = data.results.filter((item) => (
    item.name.toLowerCase().includes(filters.filterByName.name))).filter((itemF) => {
    switch (options.comparison) {
    case 'maior que':
      return itemF[options.column] > Number(options.value);
    case 'menor que':
      return itemF[options.column] < Number(options.value);
    case 'igual a':
      return itemF[options.column] === options.value;
    default:
      return itemF;
    }
  });

  const handleFilterOptions = (target) => {
    const { name, value } = target;
    setOptions({
      ...options,
      [name]: value,
    });
  };

  const handleFilterBttn = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, options],
    });
  };

  return (
    <div>
      <h1>Trybe Wars</h1>

      <input
        type="text"
        value={ filters.filterByName.name }
        onChange={ inputHandle }
        data-testid="name-filter"
      />

      <select
        data-testid="column-filter"
        name="column"
        onChange={ ({ target }) => handleFilterOptions(target) }
      >
        <option>Escolha uma coluna</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ ({ target }) => handleFilterOptions(target) }
      >
        <option>Escolha uma comparação</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ options.value }
        name="value"
        onChange={ ({ target }) => handleFilterOptions(target) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilterBttn }
      >
        Filtrar
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Url</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((item) => (
            <tr key={ item.name }>
              <td>{ item.name }</td>
              <td>{item.climate}</td>
              <td>{item.created}</td>
              <td>{item.diameter}</td>
              <td>{item.edited}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.url}</td>
              <td>
                {item.films.map((film, index) => (
                  <p key={ index }>{film}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
