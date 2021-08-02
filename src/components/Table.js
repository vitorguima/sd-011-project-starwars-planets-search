import React, { useContext, useEffect } from 'react';
import StarWarsContext from './StarWarsContext';
import Options from './ComparisonOptions';

function Table() {
  const { infos } = useContext(StarWarsContext);
  const { planetName, setPlanetName, data, setColum,
    setComparison, setValue, filterToApply,
    FilteredResults, addedFiltersArray,
    FilteredOptions, setFilteredOptions, removeFilter, filterBtnOnClickHandler,
    order, setOder, ApplyOrderBtnClickHandler,
  } = infos;

  useEffect(() => {
    setFilteredOptions(Options);
  }, [setFilteredOptions]);

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
      <label htmlFor="setColum">
        Filtrar:
        <select
          id="setColum"
          data-testid="column-filter"
          onChange={ (e) => setColum(e.target.value) }
        >
          {FilteredOptions.map((item, index2) => (
            <option key={ index2 } value={ item }>{item}</option>
          ))}
        </select>
      </label>
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
      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterBtnOnClickHandler }
      >
        Aplicar Filtros
      </button>
    );
  }

  function orderSelectorRender() {
    return (
      <label htmlFor="setColumSort">
        Ordenar:
        <select
          value={ order.column }
          id="setColumSort"
          data-testid="column-sort"
          onChange={ (e) => setOder(
            {
              column: e.target.value,
              sort: order.sort,
            },
          ) }
        >
          {Options.map((item, index2) => (
            <option key={ index2 } value={ item }>{item}</option>
          ))}
        </select>
      </label>
    );
  }

  function radioClickRender(e) {
    setOder(
      {
        column: order.column,
        sort: e.target.value,
      },
    );
  }

  function inputRadioOrderOptionsRender() {
    return (
      <>
        <label htmlFor="radioASC">
          Crescente:
          <input
            id="radioASC"
            name="RadioOrder"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ radioClickRender }
            defaultChecked
          />
        </label>
        <label htmlFor="radioDESC">
          Decrescente:
          <input
            id="radioDESC"
            name="RadioOrder"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ radioClickRender }
          />
        </label>
      </>
    );
  }

  function applyOrderBtnRender() {
    return (
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ ApplyOrderBtnClickHandler }
      >
        Aplicar Ordenação
      </button>
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
      { orderSelectorRender() }
      { inputRadioOrderOptionsRender() }
      { applyOrderBtnRender() }

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
                  index2 === 0 ? (
                    <td data-testid="planet-name" key={ tdName }>{tdName}</td>)
                    : <td key={ index2 }>{tdName}</td>))}
              </tr>)) : (
              FilteredResults.map((item, index) => (
                <tr key={ index }>
                  {Object.values(item).map((tdName, index2) => (
                    index2 === 0 ? (
                      <td data-testid="planet-name" key={ tdName }>{tdName}</td>)
                      : <td key={ tdName }>{tdName}</td>))}
                </tr>)))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
