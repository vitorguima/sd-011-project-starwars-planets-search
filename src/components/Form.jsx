import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Form() {
  const {
    /* changePlanet */ columnsOptions, comparisonOptions, handleClickTable,
    filterPreference, getNamePlanet, searchPlanet, handleChangeNamePlanets,
  } = useContext(PlanetContext);

  return (
    <form>
      <label htmlFor="planet">
        Escolha um planeta:
        <input
          id="planet"
          data-testid="name-filter"
          value={ searchPlanet }
          onChange={ getNamePlanet }
          type="text"
        />
      </label>
      <label htmlFor="column">
        Escolha uma coluna:
        <select
          id="column"
          data-testid="column-filter"
          name="columnFilter"
          value={ filterPreference.column }
          onChange={ handleChangeNamePlanets }
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
          name="comparisonFilter"
          data-testid="comparison-filter"
          value={ filterPreference.comparison }
          onChange={ handleChangeNamePlanets }
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
          name="valueFilter"
          data-testid="value-filter"
          value={ filterPreference.value }
          onChange={ handleChangeNamePlanets }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ (e) => handleClickTable(e) }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
