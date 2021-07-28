import React from 'react';
import Context from '../context/Context';

function FilteredName() {
  const { filterName, setFilterName } = React.useContext(Context); // Uso o context criado

  function handleChange({ target }) {
    setFilterName({ ...filterName, filters: { filterByName: { name: target.value } } });
  }
  // Implemento o filtro atentando-se ao estado criado em Provider e usando o spread para pegar os outros valores

  return (
    <label htmlFor="name-filter">
      Digite o nome do planeta que busca:
      <input
        type="text"
        name="name-filter"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </label>
  );
}

export default FilteredName;
