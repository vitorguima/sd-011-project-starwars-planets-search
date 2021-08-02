import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const {
    changePlanet, columnsOptions, comparisonOptions, handleClickTable,
    filterPreference, dataPlanets,
  } = useContext(PlanetContext);

  return (
    <form>
      <label htmlFor="planet">
        Escolha um planeta:
        <input
          id="planet"
          data-testid="name-filter"
          value={ dataPlanets.name }
          onChange={ changePlanet }
          type="text"
        />
      </label>
      <label htmlFor="column">
        Escolha uma coluna:
        <select
          id="column"
          data-testid="column-filter"
          name="column"
          value={ filterPreference.column }
        >
          {columnsOptions.map((option, index) => (
            <option key={ index }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparision">
        Escolha uma comparação:
        <select
          id="comparision"
          name="comparision"
          data-testid="comparison-filter"
          value={ filterPreference.comparison }
        >
          {comparisonOptions.map((comparision, index) => (
            <option key={ index }>
              {comparision}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="number">
        Escolha um número:
        <input
          type="number"
          id="number"
          name="number"
          data-testid="value-filter"
          value={ filterPreference.value }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ handleClickTable }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
