import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    setNameFilter,
    filters: { filterByName: { name } },
    allFilters,
    usedFilters,
    handleNumericFilter,
    setAddFilter,
  } = useContext(MyContext);
  // console.log(setAddFilter);

  const filters = allFilters.filter((filter) => !usedFilters.includes(filter));
  // O método includes() determina se um conjunto de caracteres pode ser encontrado dentro de outra string, retornando true ou false.

  return (
    <form>
      <label htmlFor="name-filter">
        Filtar pelo nome:
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          value={ name }
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>
      <label htmlFor="column-filter">
        Filtar pela coluna:
        <select
          data-testid="column-filter"
          name="column"
          onChange={ (e) => handleNumericFilter(e.target) }
        >
          {
            filters.map((currentFilter, index) => (
              <option key={ index } value={ currentFilter }>{currentFilter}</option>))
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Filtar por faixa de valor:
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ (e) => handleNumericFilter(e.target) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          onChange={ (e) => handleNumericFilter(e.target) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setAddFilter(true) }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
