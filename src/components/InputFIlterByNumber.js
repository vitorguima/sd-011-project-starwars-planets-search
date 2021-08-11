import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function InputFilterByNumber() {
  const { handleNumericalFilter, filters } = useContext(StarWarsContext);
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maiorQue',
    value: '0',
  });
  const initialColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const { filterByNumericValues } = filters;

    let filteredColumns = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ column: col }) => {
        filteredColumns = (filteredColumns.filter((column) => (
          column !== col
        )));
      });
    }
    setColumns(filteredColumns);
    setNumericFilter(
      { column: filteredColumns[0], comparison: 'maiorQue', value: '0' },
    );
  }, [filters]);

  function changeColumn({ target: { value } }) {
    setNumericFilter({ ...numericFilter, column: value });
  }

  function changeComparison({ target: { value } }) {
    setNumericFilter({ ...numericFilter, comparison: value });
  }

  function changeValue({ target: { value } }) {
    setNumericFilter({ ...numericFilter, value });
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (event) => changeColumn(event) }
      >
        {columns.map((column) => (
          <option value={ column } key={ column }>{column}</option>
        ))}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (event) => changeComparison(event) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        onChange={ (event) => changeValue(event) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleNumericalFilter(numericFilter) }
      >
        Filter
      </button>
    </div>

  );
}
