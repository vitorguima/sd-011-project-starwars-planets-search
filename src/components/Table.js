import React, { useContext, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import Options from './ComparisonOptions';

function Table() {
  const { infos } = useContext(StarWarsContext);
  const { planetName, setPlanetName, data, setColum,
    setComparison, setValue, filterToApply,
    FilteredResults, addedFiltersArray,
    FilteredOptions, setFilteredOptions, removeFilter, filterBtnOnClickHandler,
  } = infos;

  useEffect(() => {
    setFilteredOptions(Options);
  }, []);

  function getKeys() {
    if (data[0]) {
      const keys = Object.keys(data[0]);
      return (
        keys.map((item, index) => <th key={ index }>{item}</th>)
      );
    }
  }

  function comparisonSelectRender() {
    return (
      <select
        id="setComparison"
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    );
  }

  function columSelectRender() {
    return (
      <select
        id="setColum"
        data-testid="column-filter"
        onChange={ (e) => setColum(e.target.value) }
      >
        {FilteredOptions.map((item, index2) => (
          <option key={ index2 } value={ item }>{item}</option>
        ))}
      </select>
    );
  }

  function valueFieldInputRender() {
    return (
      <input
        id="setValue"
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
      />
    );
  }

  const filerByName = data.filter((item) => (
    item.name.toLowerCase().includes(planetName.toLowerCase())));

  function applyFiltersBtnRender() {
    return (
      <div id="filterApplyBtn">
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterBtnOnClickHandler }
        >
          Add Filtros
        </button>
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setPlanetName(e.target.value) }
      />
      { columSelectRender() }
      { comparisonSelectRender() }
      { valueFieldInputRender() }
      { applyFiltersBtnRender() }
      {
        addedFiltersArray.map((item, index) => (
          <div
            data-testid="filter"
            key={ index }
            style={ { padding: '10px' } }
          >
            <span>{item.column}</span>
            <button
              type="button"
              onClick={ () => removeFilter(index) }
            >
              X
            </button>

          </div>
        ))
      }
      <table>
        <thead>
          <tr>
            {getKeys()}
          </tr>
        </thead>
        <tbody>
          {
            !filterToApply ? filerByName.map((item, index) => (
              <tr key={ index }>
                {Object.values(item).map((tdName, index2) => (
                  <td key={ index2 }>{tdName}</td>))}
              </tr>)) : (
              FilteredResults.map((item, index) => (
                <tr key={ index }>
                  {Object.values(item).map((tdName, index2) => (
                    <td key={ index2 }>{tdName}</td>))}
                </tr>)))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
