import React, { useContext, useState } from 'react';
import PlanetsContext from '../Contexts/PlanetsContext';

function Filter() {
  const {
    name,
    setName,
    setFiltered,
    data,
    filtersByNumeric,
    setFiltersByNumeric,
  } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior');
  const [value, setValue] = useState(0);

  const filterByName = ({ target }) => {
    setName(target.value);

    const filteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));

    setFiltered(filteredPlanets);
  };

  const handleChange = ({ target }) => {
    const { id } = target;

    if (id === 'column') {
      setColumn(target.value);
    } else if (id === 'comparison') {
      setComparison(target.value);
    } else {
      setValue(target.value);
    }
  };

  const saveFilters = () => {
    const newFilter = { column, comparison, value };
    setFiltersByNumeric(filtersByNumeric.concat(newFilter));
    setColumn('population');
    setComparison('maior');
    setValue(0);
  };

  const filterByNumeric = () => {
    saveFilters();

    const filteredPlanets = data.filter((planet) => {
      if (comparison === 'maior que') {
        return parseFloat(planet[column]) > parseFloat(value);
      }
      if (comparison === 'menor que') {
        return parseFloat(planet[column]) < parseFloat(value);
      }

      return parseFloat(planet[column]) === parseFloat(value);
    });

    setFiltered(filteredPlanets);
  };

  const renderFilters = () => {
    if (filtersByNumeric.length > 0) {
      return (
        <div>
          {
            filtersByNumeric.map((filters, index) => (
              <p key={ index }>
                {`${filters.column} | ${filters.comparison} | ${filters.value}`}
              </p>
            ))
          }
        </div>
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ filterByName }
      />

      <div>
        <select
          data-testid="column-filter"
          id="column"
          value={ column }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          id="value"
          value={ value }
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterByNumeric }
        >
          Adicionar filtro
        </button>
      </div>
      {renderFilters()}
    </div>
  );
}

export default Filter;

// Deve haver um botão para acionar o filtro, com a propriedade data-testid='button-filter'
