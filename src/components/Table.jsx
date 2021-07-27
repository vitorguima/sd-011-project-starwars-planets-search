import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import TableRow from './TableRow';

export default function Table({ addFilter, removeFilter }) {
  const {
    planets,
    loading,
    filters,
    setFilters,
    filteredPlanets, setColumn, setComparison, setValue } = useContext(PlanetsContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { filterByNumericValues } = filters;
  const tableHead = Object.keys(planets[0]).filter((key) => key !== 'residents');

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setFilters({
          ...filters, filterByName: { name: e.target.value } }) }
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
      { filterByNumericValues.length > 0 && filterByNumericValues.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <p>{ filter.column }</p>
          <p>{ filter.comparison }</p>
          <p>{ filter.value }</p>
          <button type="button" onClick={ () => removeFilter(index) }>X</button>
        </div>)) }
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
  removeFilter: PropTypes.func.isRequired,
};
