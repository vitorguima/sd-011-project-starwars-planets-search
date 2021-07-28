import React, { useContext, useState } from 'react';
import MyContext from './MyContext';

function FilterNumeric() {
  const { setFilters, filters } = useContext(MyContext);
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
        Propriedade:
        <select name="column" id="column" onClick={ (e) => Column(e) }>
          <option
            data-testid="column-filter"
            value="population"
          >
            population
          </option>
          <option
            data-testid="column-filter"
            value="orbital_period"
          >
            orbital_period
          </option>
          <option
            data-testid="column-filter"
            value="diameter"
          >
            diameter
          </option>
          <option
            data-testid="column-filter"
            value="rotation_period"
          >
            rotation_period
          </option>
          <option
            data-testid="column-filter"
            value="surface_water"
          >
            surface_water
          </option>
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select name="comparison" id="comparison" onClick={ (e) => Comparison(e) }>
          <option
            data-testid="comparison-filter"
            value="maior que"
          >
            maior que
          </option>
          <option
            data-testid="comparison-filter"
            value="menor que"
          >
            menor que
          </option>
          <option
            data-testid="comparison-filter"
            value="igual a"
          >
            igual a
          </option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
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
        onClick={ createObj }
      >
        Aplicar
      </button>
    </div>
  );
}

export default FilterNumeric;
