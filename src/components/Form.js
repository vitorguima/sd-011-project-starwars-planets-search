import React, { useContext, useState } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

function Form() {
  const {
    initialFilters,
    setInitialFilters,
  } = useContext(PlanetsContext);

  const { filterByNumericValues } = initialFilters;
  const [inputNum, setInputNum] = useState('');
  const [renderOptions, setRenderOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
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

  const handleRenderOptions = () => {
    const filteredOptions = renderOptions
      .filter((filtered) => filtered
      !== initialFilters.filterByNumericValues[0].column);
    setRenderOptions(filteredOptions);
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
        { renderOptions
          .map((option, index) => <option value={ option } key={ index }>{ option }</option>) }
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
        onClick={ () => handleRenderOptions() }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Form;
