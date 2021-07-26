import React from 'react';
import GlobalContext from '../context/GlobalContext';

function FilterName() {
  const { filterName, setFilterName } = React.useContext(GlobalContext);

  function handleChange({ target }) {
    setFilterName({ ...filterName,
      filters: {
        filterByName: {
          name: target.value,
        },
      } });
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Filtro por nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}

export default FilterName;
