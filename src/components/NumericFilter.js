import React, { useState, useContext } from 'react';
import Context from '../context/Context';

const initial = {
  column: '',
  comparison: '',
  value: '',
};

export default function NumericFilter() {
  const [thisFilter, setThisFilter] = useState(initial);
  const { filters, setFilters } = useContext(Context);

  const column = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparison = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const handleChange = ({ target }) => {
    setThisFilter({
      ...thisFilter,
      [target.name]: target.value,
    });
  };

  const handleclick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [thisFilter],
    });
  };

  // const testehandleclick = () => {
  //   const { column } = filters.filterByNumericValues[0];
  //   const tes = planets[0];
  //   console.log(tes[column]);
  //   // console.log(tes);
  // };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {column.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        {comparison.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleclick }
      >
        Filtrar

      </button>
      {/* <button
        type="button"
        onClick={ testehandleclick }
      >
        teste

      </button> */}
    </div>
  );
}
