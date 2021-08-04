import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

function FilterSearch(props) {
  const { filter, setFilter } = props;
  const { filters: { filterByNumericValues } } = filter;
  const { column, comparison, value } = filterByNumericValues[0];
  const {
    planetsFilter: { filteredPlanets },
    setPlanetsFilter,
    dataFromApi: { planets: { results } },
  } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    setFilter({
      filters: {
        ...filter.filters,
        filterByNumericValues: [{
          ...filter.filters.filterByNumericValues[0], [target.name]: target.value,
        }],
      },
    });
  };

  const handleSubmit = () => {
    let data = results;
    if (filteredPlanets.length) { data = filteredPlanets; }

    switch (comparison) {
    case 'menor que':
      setPlanetsFilter({
        filteredPlanets: data.filter((planet) => parseInt(planet[column], 10) < value),
      });
      break;

    case 'igual a':
      setPlanetsFilter({
        filteredPlanets: data
          .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10)),
      });
      break;

    default:
      setPlanetsFilter({
        filteredPlanets: data.filter((planet) => parseInt(planet[column], 10) > value),
      });
    }
  };

  return (
    <form>
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select data-testid="comparison-filter" name="comparison" onChange={ handleChange }>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSubmit }
      >
        Filtrar
      </button>
    </form>
  );
}

FilterSearch.propTypes = {
  filter: PropTypes.shape({ }),
  setFilter: PropTypes.func,
}.isRequired;

export default FilterSearch;
