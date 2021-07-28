import React, { useContext } from 'react';
import GlobalContext from './Context';
import handleFilters from './handleFilters';

const Table = () => {
  const { results } = useContext(GlobalContext);
  const options = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [newPlanetFilter, setNewPlanetFilter] = React.useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [planetFilter, setplanetFilter] = React.useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
    ],
  });

  const usedFilters = planetFilter.filterByNumericValues
    .map((condition) => condition.column);

  const handleFilterByName = ({ target }) => {
    setplanetFilter({ ...planetFilter, filterByName: { name: target.value } });
  };

  function handlefilterByNumericValues({ target }) {
    const { name, value } = target;
    setNewPlanetFilter({ ...newPlanetFilter, [name]: value });
  }

  const handleFilterButton = () => {
    setplanetFilter({ ...planetFilter,
      filterByNumericValues: [...planetFilter.filterByNumericValues, newPlanetFilter] });
  };

  if (!results) return <div>Loading...</div>;
  const { name } = planetFilter;
  return (
    <div>
      <input
        type="text"
        value={ name }
        onChange={ handleFilterByName }
        data-testid="name-filter"
      />
      <form>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handlefilterByNumericValues }
        >
          {options.filter((toRemove) => !usedFilters.includes(toRemove))
            .map((option) => <option key={ option }>{option}</option>)}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handlefilterByNumericValues }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ handlefilterByNumericValues }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterButton }
        >
          Add Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {Object
              .keys(results[0])
              .filter((content) => content !== 'residents')
              .map((header, index) => <th key={ index }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {handleFilters(results, planetFilter)
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
