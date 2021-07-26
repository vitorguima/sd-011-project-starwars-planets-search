import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import TableRow from './TableRow';

export default function Table({ addFilter }) {
  const {
    planets,
    loading,
    setFilters,
    filteredPlanets, setColumn, setComparison, setValue } = useContext(PlanetsContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableHead = Object.keys(planets[0]).filter((key) => key !== 'residents');
  // const { filterByName: { name } } = filters;
  // let planetsList = planets.filter((planet) => planet.name.includes(name));

  // const addFilter = () => {
  // const newFilter = { column, comparison, value };
  // setFilters({
  //   ...filters, filterByNumericValues: [...filters.filterByNumericValues, newFilter] });
  // switch (comparison) {
  // case 'greater':
  //   planetsList = planetsList.filter((planet) => planet[column] > value);
  //   break;
  // case 'smaller':
  //   planetsList = planetsList.filter((planet) => planet[column] < value);
  //   break;
  // case 'equal':
  //   planetsList = planetsList.filter((planet) => planet[column] === value);
  //   break;
  // default:
  //   console.log('choose a proper comparison');
  // }
  // };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setFilters({ filterByName: { name: e.target.value } }) }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        Add filter
      </button>
      <table>
        <thead>
          <tr>
            { tableHead.map((key, index) => <th key={ index }>{key}</th>) }
          </tr>
        </thead>
        <tbody>
          { filteredPlanets.map((planet,
            index) => <TableRow key={ index } planet={ planet } />) }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  addFilter: PropTypes.func.isRequired,
};
