import React, { useContext, useState, useEffect } from 'react';
import SWContext from '../context/SWContext';

function Filter() {
  const { filters, setFilters } = useContext(SWContext);
  const [column, setColumn] = useState('population');
  const [comparsion, setComparsion] = useState('maior que');
  const [parseValue, setParseValue] = useState(0);

  const optionDisabled = {
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  };

  const [isDisabled, setIsDisabled] = useState(optionDisabled);

  const resetAllOptionsFilter = () => {
    setColumn('population');
    setComparsion('maior que');
    setParseValue(0);
  };

  const resetFilters = () => {
    setFilters({
      filterByName: { name: '' },
      filterByNumericValues: [],
    });
  };

  const setIdDisabledOption = () => {
    filters.filterByNumericValues.forEach((filter) => {
      setIsDisabled({ ...isDisabled, [filter.column]: true });
    });
  };

  useEffect(() => {
    setIdDisabledOption();
  }, [filters, setIdDisabledOption]);

  const applyFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparsion,
          value: parseValue,
        },
      ],
    });
    resetAllOptionsFilter();
  };

  return (

    <div className="filter-table">
      <label htmlFor="column">
        Column:
        <select
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          <option disabled={ isDisabled.population } value="orbital_period">
            Population
          </option>
          <option disabled={ isDisabled.orbital_period } value="orbital_period">
            orbital_period
          </option>
          <option disabled={ isDisabled.diameter } value="diameter">
            diameter
          </option>
          <option disabled={ isDisabled.rotation_period } value="rotation_period">
            rotation_period
          </option>
          <option disabled={ isDisabled.surface_water } value="surface_water">
            surface_water
          </option>
        </select>
      </label>

      <label htmlFor="comparsion">
        Comparsion:
        <select
          data-testid="comparison-filter"
          name="comparsion"
          value={ comparsion }
          onChange={ (e) => setComparsion(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value">
        Value
        <input
          type="number"
          name="value"
          value={ parseValue }
          data-testid="value-filter"
          onChange={ (e) => setParseValue(e.target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ applyFilter }
      >
        Filtrar
      </button>
    </div>

  );
}

export default Filter;
