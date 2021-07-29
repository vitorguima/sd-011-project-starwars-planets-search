import React from 'react';
import Context from '../context/Context';
import Selectors from './Selectors';

function FilteredName() {
  const { filterName, setFilterName,
    filterName: { filters } } = React.useContext(Context); // Uso o context criado

  function handleChange({ target }) {
    setFilterName(
      { ...filterName,
        filters: {
          filterByName: {
            name: target.value,
          },
          filterByNumericValues: filters.filterByNumericValues,
        } },
    );
  }
  // Implemento o filtro atentando-se ao estado criado em Provider e usando o spread para pegar os outros valores

  return (
    <>
      <label htmlFor="name-filter">
        Digite o nome do planeta que busca:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <Selectors />
    </>
  );
}

export default FilteredName;
