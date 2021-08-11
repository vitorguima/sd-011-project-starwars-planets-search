import React, { useContext, useState } from 'react';
import TablePlanetsContext from '../contexts/TablePlanetsContext';

export default function FilterByNumber() {
  const { filter, setFilter } = useContext(TablePlanetsContext);

  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  const [localFilter, setlocalFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const handleColumnFilters = ({ value }) => {
    setlocalFilter({
      ...localFilter,
      column: value,
    });
  };

  const handleComparisonFilters = ({ value }) => {
    setlocalFilter({
      ...localFilter,
      comparison: value,
    });
  };

  const handleValueFilters = ({ value }) => {
    setlocalFilter({
      ...localFilter,
      value,
    });
  };

  const sendFilters = () => {
    setFilter({
      ...filter,
      filterbyNumericValues: [...filter.filterbyNumericValues, localFilter],
    });
    const newColumn = [];
    columns.filter((column) => column !== localFilter.column)
      .forEach((column) => {
        newColumn.push(column);
        setColumns(newColumn);
      });
    const target = {
      value: newColumn[0],
    };
    handleColumnFilters(target);
  };

  return (
    <div>
      <span>Filtro: </span>
      <select
        name="column-filter"
        htmlFor="column-filter"
        data-testid="column-filter"
        onChange={ ({ target }) => handleColumnFilters(target) }
      >
        { columns.map((column, index) => (
          <option key={ index }>
            { column }
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison-filter"
        onChange={ ({ target }) => handleComparisonFilters(target) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value-filter"
        onChange={ ({ target }) => handleValueFilters(target) }
      />
      <button
        type="button"
        data-testid="button-filter"
        name="button-filter"
        onClick={ sendFilters }
      >
        Filtrar
      </button>
    </div>
  );
}
