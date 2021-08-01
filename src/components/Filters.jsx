import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    setNameFilter,
    filters: { filterByName: { name } },
    handleNumericFilter,
    setAddFilter,
  } = useContext(MyContext);
  // console.log(setAddFilter);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
