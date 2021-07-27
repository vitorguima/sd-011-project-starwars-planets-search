import React, { useContext } from 'react';
import Context from '../APIcontext/Context';

function FilterList() {
  const { filters, filters: { filterByNumericValues }, setFilters } = useContext(Context);

  const removeFilter = (name) => {
    console.log(filterByNumericValues);
    console.log(name);
  };

  return (
    <div>
      <h4>Filtros sendo usados</h4>
      {filterByNumericValues.length >= 1 ? filterByNumericValues.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          {' Coluna: '}
          { filter.column}
          {' Comparação: '}
          {filter.comparison }
          {' Valor: '}
          { filter.value }
          <button name={ filter.column } type="button" onClick={ (name) => removeFilter(name) }> Excluir</button>
        </div>
      )) : <span>Nenhum filtro realizado</span>}
    </div>
  );
}

export default FilterList;
