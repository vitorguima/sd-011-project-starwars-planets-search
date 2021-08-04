import React, { useContext } from 'react';
import FilteredContext from '../context/FilteredContext';

function InputFromTable() {
  const { filters, setFilters } = useContext(FilteredContext);

  // Lógica do input desenvolvida com a ajuda do
  // Henrique Pozzolini - Turma 11 e da Gabriela Feijó - Turma 11

  return (
    <input
      data-testid="name-filter"
      onChange={ (e) => setFilters({
        ...filters,
        filterByName: {
          name: e.target.value,
        },
      }) }
    />
  );
}

export default InputFromTable;
