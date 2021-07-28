import React, { useContext, useState } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

function Form() {
  const {
    initialFilters,
    setInitialFilters,
  } = useContext(PlanetsContext);

  const { filterByNumericValues } = initialFilters;
  const [inputNum, setInputNum] = useState('');
  // para realizar esta parte, utilizei como base o seguinte material: https://dev.to/anilsingh/allow-only-numbers-in-input-in-react-2m71

  const handleChange = ({ target }) => {
    const { value, name } = target;
    const numRegexp = /^[0-9\b]+$/;

    if (inputNum === '' || numRegexp.test(value)) {
      setInputNum(value);
    }
    setInitialFilters({
      ...initialFilters,
      filterByNumericValues: [{ ...filterByNumericValues[0], [name]: value }],
    });
  };

  return (
    <div>
      <label htmlFor="planetName">
        <input
          type="text"
          id="planetName"
          data-testid="name-filter"
          onChange={ ({ target }) => setInitialFilters({
            ...initialFilters, filterByName: { name: target.value } }) }
        />
      </label>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (e) => handleChange(e) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (e) => handleChange(e) }
      >
        <option>filtros</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        name="value"
        value={ inputNum }
        type="number"
        data-testid="value-filter"
        onChange={ (e) => handleChange(e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        // onClick={ () => }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Form;
