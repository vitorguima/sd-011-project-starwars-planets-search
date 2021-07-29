import React, { useContext, useState } from 'react';
import MyContext from './MyContext';

function FilterNumeric() {
  const { setFilters, filters, vazio } = useContext(MyContext);
  const [coluna, setColumn] = useState({});
  const [comparacao, setComparison] = useState({});
  const [valor, setValue] = useState({});

  const Column = ({ target: { value } }) => {
    setColumn(value);
  };

  const Comparison = ({ target: { value } }) => {
    setComparison(value);
  };

  const Value = ({ target: { value } }) => {
    setValue(value);
  };

  const createObj = () => {
    setFilters(
      { ...filters,
        filterByNumericValues:
        [{ column: coluna, comparison: comparacao, value: valor }] },
    );
  };

  return (
    <div>
      <label htmlFor="column">
        Filtro:
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ (e) => Column(e) }
        >
          <option value={ vazio }>{vazio}</option>
          <option
            value="population"
          >
            population
          </option>
          <option
            value="orbital_period"
          >
            orbital_period
          </option>
          <option
            value="diameter"
          >
            diameter
          </option>
          <option
            value="rotation_period"
          >
            rotation_period
          </option>
          <option
            value="surface_water"
          >
            surface_water
          </option>
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ (e) => Comparison(e) }
        >
          <option value={ vazio }>{vazio}</option>
          <option
            value="maior que"
          >
            maior que
          </option>
          <option
            value="menor que"
          >
            menor que
          </option>
          <option
            value="igual a"
          >
            igual a
          </option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          id="value"
          type="number"
          data-testid="value-filter"
          onChange={ (e) => Value(e) }
        />
      </label>
      <button
        value="button"
        id="button"
        type="button"
        data-testid="button-filter"
        onClick={ createObj }
      >
        Aplicar
      </button>
    </div>
  );
}

export default FilterNumeric;
